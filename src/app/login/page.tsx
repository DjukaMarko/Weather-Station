import { Button } from "@/components/ui/button"
import { Metadata } from "next";
import WeatherSignPresentation from "../../components/ui/WeatherSignPresentation";
import Link from "next/link";
import SignIn from "./components/ui/SignIn";


export const metadata: Metadata = {
  title: "Login - Cloudcast",
  description: "Authentication form.",
}

export default function Page() {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 relative">
      <div className="absolute top-4 right-4 z-20 flex items-center">
        <Button variant="ghost" asChild>
          <Link href="/register">Create an account</Link>
        </Button>
      </div>
      <WeatherSignPresentation />
      <SignIn />
    </div>
  );
}
