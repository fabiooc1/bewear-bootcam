import { Header } from "@/components/common/header";
import { ProductList } from "@/components/common/product-list";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true
    }
  });

  return (
    <>
      <Header />

      <div className="px-5 space-y-6">
        <Image 
          src="/banner01.png"
          alt="Leve uma vida com estilo"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />

        <ProductList title="Mais vendidos" products={products} />

        <Image 
          src="/banner02.png"
          alt="Autêntico"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
    </>
  );
}
