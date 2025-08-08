"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { AddAddressForm } from "./add-address-form";

export default function Address() {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>

        <CardContent className="p-0 mt-2">
          <RadioGroup
            value={selectedAddress}
            onValueChange={setSelectedAddress}
          >
            <Card>
              <CardContent>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="add-new" id="add-new" />
                    <Label htmlFor="add-new">Adicionar novo endereço</Label>
                </div>
              </CardContent>
            </Card>
          </RadioGroup>

          {selectedAddress === "add-new" && (
            <AddAddressForm />
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
}
