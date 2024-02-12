import React, { ReactNode, useEffect } from "react";
import { CategoryContainer } from "../StyledComponents/App";
import SPItem from "../../types/SPItem";
import ServiceCard from "../ServiceCard";
import { Flipped, Flipper } from "react-flip-toolkit";
import { animateElementIn, animateElementOut, simultaneousAnimations } from "../../utils/FlipAnimation";

type Props = {
    category: string | undefined | null;
    services: Array<SPItem>;
    updatestatus?: (service: SPItem, status:string) => void;
    children?: ReactNode
}

const Category = ({ category, services, updatestatus, children }: Props) => {

  const [internalServices, setInternalServices] = React.useState<Array<SPItem>>(services);
  let flipTrigger = React.useRef<any>();
  useEffect(() => {
    setInternalServices([...sortArray(services)]);
    flipTrigger.current = Math.random();  
  },[services])

  // TODO: This is hard coded, but needs to be dynamic based on values in the choice field
  enum SortOrder{
    NonOperational = 0,
    Degraded = 1,
    Operational = 2
  }

  console.log('updatestatus', updatestatus);
  function sortArray (array: Array<SPItem>) {
    return array.sort((a:SPItem, b:SPItem)=> {
      if (a.Status === b.Status){
       return a.Title < b.Title ? -1 : 1
      } else {
        let sortA = (a.Status === "Non-Operational") ? SortOrder.NonOperational : (a.Status === "Degraded") ? SortOrder.Degraded : SortOrder.Operational;
        let sortB = (b.Status === "Non-Operational") ? SortOrder.NonOperational : (b.Status === "Degraded") ? SortOrder.Degraded : SortOrder.Operational;

        return (sortA > sortB) ? 1 : (sortA < sortB) ? -1 : 0;
      }
    })
  }

  return (
      <CategoryContainer>
          <h1>{category}</h1>
          <Flipper flipKey={flipTrigger.current} element="div" handleEnterUpdateDelete={simultaneousAnimations}>
            {internalServices.map((s: SPItem, i:number) => {
              return (
                <Flipped key={`${s.GUID}`} flipId={`${s.GUID}`} onAppear={animateElementIn} onExit={animateElementOut}>
                    {flippedProps => <ServiceCard service={s} key={`${s.Title}`} {...(updatestatus ? {updateStatus: updatestatus} : {})} flippedProps={flippedProps} />}
                </Flipped>
              );
            })}
          </Flipper>
      </CategoryContainer>
  );
}

export default Category;