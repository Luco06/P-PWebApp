import React from "react";
import Button from "./Button";

type Props = {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
};

export default function CatePiles({
  onSelectCategory,
  selectedCategory,
}: Props) {
  const Categories = [
    { id: 1, txt: "Viande" },
    { id: 2, txt: "Poisson" },
    { id: 3, txt: "Végétarien" },
    { id: 4, txt: "Desserts" },
    { id: 5, txt: "Boissons" },
    { id: 6, txt: "Sauces" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full max-w-5xl">
      {Categories.map((categorie) => (
        <Button
          key={categorie.id}
          txt={categorie.txt}
          className="w-40"
          active={selectedCategory === categorie.txt}
          onClick={() => onSelectCategory(categorie.txt)}
        />
      ))}
    </div>
  );
}
