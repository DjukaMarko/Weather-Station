import Image from "next/image";
import { Button } from "./button";
import google from "../../../public/google.svg"
import github from "../../../public/github-mark.svg"
import { githubauthenticate, googleauthenticate } from "@/lib/actions";

export default function SignWithThirdParty() {
    return (
        <div className="w-full pt-4 flex flex-col space-y-6">
            <div className="relative flex flex-col justify-center items-center">
                <div className="w-full h-[1px] bg-zinc-400"></div>
                <div className="bg-white p-1 absolute">
                    <p className="text-zinc-500 text-xs">OR CONTINUE WITH</p>
                </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-1">

                <Button onClick={() => googleauthenticate()} className="flex justify-center items-center" variant={"outline"}>
                    <Image src={google} alt="Google" className="w-5" />
                </Button>
                <Button onClick={() => githubauthenticate()} className="flex justify-center items-center" variant={"outline"}>
                    <Image src={github} alt="GitHub" className="w-5" />
                </Button>
            </div>
        </div>
    );
}
