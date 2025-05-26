'use client';
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu(){
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch('/api/menu-items').then(res => {
      res.json().then(menuItems => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);

    return (
      <section>

        <div className="absolute left-0 ritht-0 w-full justify-start">
          <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={'/sallad1.png'} layout={'fill'} objectFit={'contain'}  alt="salad" />
          </div>
          <div className="absolute -top-[100px] right-0 -z-10">
          <Image src={'/sallad2.png'} layout={'fill'} objectFit={'contain'} alt="salad" />
          </div>
        </div>
  
        <div className="text-center">    
        <SectionHeaders subHeader={'checkOut'} mainHeader={'Menu'}  />
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {bestSellers?.length > 0 && bestSellers.map(item => (
          <MenuItem key={item._id} {...item} />
        ))}
        </div>
        
      </section>
    );
}



