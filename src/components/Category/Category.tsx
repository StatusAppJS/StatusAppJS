import { ReactNode, useEffect } from "react";
import { CategoryContainer } from "../StyledComponents/App/App";
import SPItem from "../../types/SPItem";
import ServiceCard from "../ServiceCard";
import React from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { animateElementIn, animateElementOut, simultaneousAnimations } from "../../utils/FlipAnimation";

type Props = {
    category: string | undefined | null;
    children?: ReactNode
}

const Category = ({ category, children }: Props) => {
  const renderContent = (
      <CategoryContainer>
          <h1>{category}</h1>
          {children}
      </CategoryContainer>
  )

  return renderContent;
}

export default Category;