import React from 'react';
import Header from '@/app/Components/Header/header';
import Footer from '@/app/Components/Footer/footer';

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