import React from "react";
import Footer from "@/app/Components/Footer/footer";
import Header from "@/app/Components/Header/header";

type FormatProps = {
  children: React.ReactNode;
};

const Format: React.FC<FormatProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Format;
