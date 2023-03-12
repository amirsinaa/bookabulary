import { featuresData, faqData } from "@/constants/data"
import Features from "@/components/homepage/features";
import Hero from "@/components/homepage/hero";
import Faq from "@/components/homepage/faq";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  return (
    <>
      <Hero />
      <div className="w-full px-10 py-16">
        <Features data={featuresData} />
      </div>
      <div className="w-full px-10 py-10">
        <h3 className="mb-10 text-4xl text-center font-bold font-heading tracking-px-n leading-none">Frequently Asked Questions</h3>
        <Faq data={faqData} />
      </div>
    </>
  );
}

export default HomePage;