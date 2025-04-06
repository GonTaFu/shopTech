'use client';
import Image from "next/image";
import Showroom from "../../components/Showroom";

export default function showroomPage() {
    return (
        <div>
            <title>Showroom Page</title>
            <Showroom></Showroom>
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