"use client"
import Image from "next/image";
import Profile from "./profile";

export default function payPage() {
    return (
        <div>
            <title>Profile Page</title>
            <Profile></Profile>


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