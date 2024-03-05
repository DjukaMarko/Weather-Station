import { Feather } from 'lucide-react';

export default function WeatherSignPresentation() {
    return (
        <div className="bg-zinc-900 w-full h-screen relative hidden lg:block">
            <div className="absolute top-6 left-6 flex space-x-3 items-center">
                <Feather color="white" size={24} />
                <p className="text-white text-2xl font-[600]">Cloudcast</p>
            </div>
            <div className="absolute bottom-6 left-6">
                <blockquote className="text-white mt-6 border-l-2 pl-4 italic text-md">
                    "Wherever you go, no matter what the weather, always bring your own sunshine." - Anthony J. D'Angelo
                </blockquote>
            </div>
        </div>
    );
}
