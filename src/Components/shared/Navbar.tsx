import React from "react";
import NavLinks from "./NavLinks";
import { ICats } from "@/types/news.types";


const getCategory = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/categories");
  const data = await res.json();
  return data.data;
};

const Navbar = async () => {
  const categoryData: ICats[] = await getCategory();

  const category = categoryData.filter((n) => n.scrapable);

  return (
    <div className="text-center space-x-8">
      <NavLinks href="/">হোম</NavLinks>
      {category.slice(0, 8).map((cat) => (
        <NavLinks href={`/category/${cat.slug}`} key={cat.slug}>
          {cat.title}
        </NavLinks>
      ))}
    </div>
  );
};

export default Navbar;
