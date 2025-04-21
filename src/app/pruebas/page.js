'use client'
import Button from "@/components/Button";
import { useState } from "react"

export default function Favoritos(){

    //react hook
    const [count, setCount] = useState(1);
    return (
        <div className="flex flex-col items-center justify-center h-[100vh]">
            pruebitas {count}

            <Button>
                babosh
            </Button>
        </div>
    )
}