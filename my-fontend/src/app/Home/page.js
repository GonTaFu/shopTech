'use client';
import Image from "next/image";
import HomePage from "../../components/Home"

export default function homePage() {
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