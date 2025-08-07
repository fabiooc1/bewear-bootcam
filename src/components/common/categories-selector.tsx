import { categoryTable } from "@/db/schema";
import { Button } from "../ui/button";
import Link from "next/link";

interface CategoriesSelectorProps {
    categories: (typeof categoryTable.$inferSelect)[];
}

export function CategoriesSelector({ categories }: CategoriesSelectorProps) {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="ghost"
            className="rounded-full bg-white text-xs font-semibold"
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
}