import Link from "next/link";
import WeatherForm from "./WeatherForm";

export default function SignUp() {
    return (
        <div className="w-full h-screen relative flex justify-center items-center">
            <div className="flex flex-col space-y-4 items-center text-center max-w-[400px] p-4">
                <div className="flex flex-col space-y-2">
                    <p className="font-bold text-3xl">Create an account</p>
                    <p className="text-muted-foreground font-[500] text-sm">Enter your email and password below to create your account</p>
                </div>
                <WeatherForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    By clicking continue, you agree to our{" "}
                    <Link
                        href="#"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="#"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
