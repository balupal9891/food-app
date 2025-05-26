import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />

      <section className="text-center my-6" id="about">
        <SectionHeaders subHeader={'OUR STORY'} mainHeader={'About Us'}  />
        <div className="text-gray-700 max-w-2xl mx-auto flex flex-col gap-2 mt-4">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga aliquam tempora amet consequatur pariatur placeat exercitationem alias eaque quam, officiis porro, magni dolore!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga aliquam tempora amet consequatur pariatur placeat exercitationem alias eaque quam, officiis porro, magni dolore!</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga aliquam tempora amet consequatur pariatur placeat exercitationem alias eaque quam, officiis porro, magni dolore!</p>
        </div>
      </section>

      <section className="text-center my-8" id="contact">
        <SectionHeaders subHeader={'don\'t heasitate'} mainHeader={'Contact Us'} />
        <div className="mt-6">
          <a className="font-semibold text-4xl " href="+4 456 345 354">+4 456 345 354</a>
        </div>
      </section>

      

    </>
  );
}
