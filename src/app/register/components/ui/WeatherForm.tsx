'use client'

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SyntheticEvent, useState } from "react";

export default function WeatherForm() {
    const [isLoading, setLoading] = useState(false);

    let handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
    }
    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-1">
                    <Label className="sr-only" htmlFor="email">
                        Email
                    </Label>
                    <Input
                        id="email"
                        className="placeholder:text-zinc-500"
                        placeholder="name@example.com"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                    />

                    <Label className="sr-only" htmlFor="password">
                        Enter Password
                    </Label>
                    <Input
                        id="password"
                        className="placeholder:text-zinc-500"
                        placeholder="Enter your password"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                    />

                    <Label className="sr-only" htmlFor="confirm-password">
                        Confirm your password
                    </Label>
                    <Input
                        id="confirm-password"
                        className="placeholder:text-zinc-500"
                        placeholder="Confirm your password"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                    />
                </div>

                <Button variant={"default"} className="w-full mt-6" disabled={isLoading}>
                    {isLoading &&
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Continue
                </Button>
            </form>
        </div>
    );
}
