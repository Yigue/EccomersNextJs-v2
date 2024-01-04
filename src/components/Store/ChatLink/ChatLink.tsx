"use client";
import Link from "next/link";
import styles from "./ChatLink.module.sass";
import { createAgent } from "app/utils/openai/createAgent";
import { getProducts } from "app/services/shopify/products";
import { Chat } from "app/components/chat/chat";
import { useEffect, useState } from "react";

export const ChatLink =  () => {
  const [isOpen, setIsOpen] = useState(false);
  const [agent, setAgent] = useState("");
  useEffect(() => {
   fetch("http://localhost:3000/api")
    .then((res) => {
      return res.json();
    })
    .then(({products}) => {
      console.log(products);
      
      const productTitles = products.map(
        (product: { title: string }) => product.title
      );
      const flatProductTitles = productTitles.join("\n");
      const agent = createAgent(flatProductTitles);
      setAgent(agent)
    });
  
  }, [])
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

 
  return (
    <>
      <button className={styles.ChatLink} onClick={handleClick}>
        Chat ✨
      </button>
      {isOpen && (<>
        <section className={styles.Chat }>
          <Chat agent={agent} />
    
        </section>
        <div className={styles.Piquito}/>
     </>
      )}
    </>
  );
};
