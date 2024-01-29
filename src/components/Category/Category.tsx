import { ReactNode } from "react";
import { CategoryContainer } from "../StyledComponents/App/App";
import SPItem from "../../types/SPItem";
import ServiceCard from "../ServiceCard";
import React from "react";


type Props = {
    category: string | undefined | null;
    services: SPItem[];
    updateFunction: (service: SPItem, status: string) => Promise<SPItem>;
    children?: ReactNode
}

const Category = ({ category, services, updateFunction, children }: Props) => {

  const renderContent = (
    <CategoryContainer status={status}>
        <h1>{category}</h1>
        {services.map((s: SPItem, i:number) => <ServiceCard service={s} key={`${s.Title}`} updateStatus={updateFunction} />)}
    </CategoryContainer>
  )

  return renderContent;
}

export default Category;