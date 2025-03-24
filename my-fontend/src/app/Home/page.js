'use client';
import Image from "next/image";
import HomePage from "./Home"

export default function payPage() {
    return (
        <div>
            <title>Home Page</title>
            <HomePage></HomePage>


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
