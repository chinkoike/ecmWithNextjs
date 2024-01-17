"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import Navitem from "./Navitem";
import { useOnClickOutside } from "@/hook/click-outside-close";
const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const isAnyOpen = activeIndex !== null;
  const refNav = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };
    // the handler fn will get call when press key
    document.addEventListener("keydown", handler);

    return () => {
      //then clean up prevent memory use
      document.removeEventListener("keydown", handler);
    };
  }, []);

  useOnClickOutside(refNav, () => setActiveIndex(null));
  return (
    <div className="flex gap-4 h-full" ref={refNav}>
      {PRODUCT_CATEGORIES.map((category, i) => {
        const handleOpen = () => {
          if (activeIndex === i) {
            setActiveIndex(null);
          } else {
            setActiveIndex(i);
          }
        };
        const isOpen = i === activeIndex;
        return (
          <Navitem
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            key={category.value}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
