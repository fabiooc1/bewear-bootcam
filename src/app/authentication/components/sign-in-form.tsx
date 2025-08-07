"use client"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from 'sonner'
import { useState } from "react";
import { useRouter } from "next/navigation";


const SignInFormSchema = z.object({
  email: z.email("E-mail inválido!"),
  password: z.string().min(8, "Senha inválida!"),
});

type SignInFormValues = z.infer<typeof SignInFormSchema>

export function SignInForm() {
  const router = useRouter()
  const [isSubmitingSignInForm, setIsSubmitingSignInForm] = useState(false)
  const form = useForm({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: SignInFormValues) {
    setIsSubmitingSignInForm(true)

    await authClient.signIn.email({
      ...values,
      fetchOptions: {
        onSuccess: () => {
          router.push("/")
        },
        onError: (ctx) => {
          if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
            toast.error("E-mail ou senha inválidos!")

            form.setError("email", {
              message: "E-mail ou senha inválidos!"
            })
            form.setError("password", {
              message: "E-mail ou senha inválidos!"
            })

            return
          }

          toast.error(ctx.error.message)
        }
      }
    })

    setIsSubmitingSignInForm(false)
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Entrar</CardTitle>
          <CardDescription>Faça login para continuar.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CardContent className="grid gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Digite sua senha"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isSubmitingSignInForm}>
                {isSubmitingSignInForm ? "Entrando..." : "Entrar"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
}
