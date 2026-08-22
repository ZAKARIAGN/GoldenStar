import React from "react";
import Info from "./Info";
import ContactForm from "./ContactForm";

const Section = () => {
  return (
    <div className="w-full p-10 flex justify-center items-center text-sm">
      <div className="w-[1200px] flex justify-between gap-16">  
        <Info />
        <ContactForm />
      </div>
    </div>
  );
};

export default Section;
