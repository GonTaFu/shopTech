'use client';
import Image from "next/image";
import PayBill from "./paybill.js";

export default function payPage() {
    return (
        <div>
            <h1>Thanh toán</h1>
            <PayBill></PayBill>


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
