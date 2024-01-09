import React, { FunctionComponent, useEffect, useState } from "react";
import UseProviderContext from "./contexts/SharePoint/UseProviderContext";
import { IItems } from "@pnp/sp/items/types";
import SPItem from "./types/SPItem";
const App: FunctionComponent = () => {
  const { provider } = UseProviderContext();
  const [items, setItems] = useState(Array<SPItem>());

  useEffect(() => {
    getItems().then((items: SPItem[]) => {
      setItems(items);
    })  
  },[]);

  async function getItems(){
    return provider.sp.web.lists.getByTitle("IEMO Services Statuses").items<SPItem[]>();
    
  }
  
  return (
    <div>
      <h1>SharePoint Provider</h1>
      {
        items.length > 0 ?
        <ul>
          {
            items.map((item, index) => {
              return <li key={index}>{item.Title}</li>
            })
          }
        </ul>
        :
        <button onClick={getItems}>Get Items</button>
      }
    </div>
  );
  
}

export default App;