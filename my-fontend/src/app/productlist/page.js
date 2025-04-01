'use client';
import Image from "next/image";
import PageProductList  from "../../components/ProductList";

export default function ProductList() {
    return (
        <div>
            <PageProductList></PageProductList>
            <style jsx>{`
            h1 {
                align-items: center;
                justify-content: center;
                display: flex;
                },
                `}</style>
        </div>
    );
}
