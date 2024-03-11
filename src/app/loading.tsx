import { Icons } from "@/components/ui/icons";

export default function Loading() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Icons.spinner className="h-20 w-20 animate-spin" />
        </div>
    );
}