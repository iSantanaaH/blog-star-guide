import React from "react";
import Footer from "@/app/Components/Footer/footer";

type FormatProps = {
  children: React.ReactNode;
};

const Format: React.FC<FormatProps> = ({ children }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default Format;
