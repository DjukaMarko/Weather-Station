import { Button } from "@/components/ui/button"
import { Metadata } from "next";
import WeatherSignPresentation from "../../components/ui/WeatherSignPresentation";
import SignUp from "./components/ui/SignUp";
import Link from "next/link";


export const metadata: Metadata = {
    title: "Register - Cloudcast",
    description: "Authentication form.",
}

export default function Page() {
    return (
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 relative">
            <div className="absolute top-4 right-4 z-20">
                <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                </Button>
            </div>
           <WeatherSignPresentation />
           <SignUp />

        </div>
    );
}
