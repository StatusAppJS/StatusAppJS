import React, { ReactNode, useEffect } from "react";
import { CategoryContainer } from "../StyledComponents/App";
import SPItem from "../../types/SPItem";
import ServiceCard from "../ServiceCard";
import { Flipped, Flipper } from "react-flip-toolkit";
import { animateElementIn, animateElementOut, simultaneousAnimations } from "../../utils/FlipAnimation";
import { AddServiceButton } from "../StyledComponents/App/App";

type Props = {
    category: string | undefined | null;
    children?: ReactNode;
}

const NewCategory = ({ category, children }: Props) => {

  return (
      <AddServiceButton>
            + Add Service
      </AddServiceButton>
  );
}

export default NewCategory;