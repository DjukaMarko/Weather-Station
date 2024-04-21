'use client'

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authenticate } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useAuthentication from "@/components/hooks/useAuthentication";

export default function SignInForm() {
    const { handleSubmit, errorMessage, isLoading } = useAuthentication(authenticate);

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
                        name="email"
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
                        className="placeholder:text-zinc-500 placeholder:text-xs"
                        name="password"
                        placeholder="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                    />
                </div>

                <Button id="submit" variant={"default"} className="w-full mt-6" disabled={isLoading}>
                    {isLoading &&
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Continue
                </Button>

                {errorMessage &&
                    <Alert className="mt-4" variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            {errorMessage.message}
                        </AlertDescription>
                    </Alert>
                }
            </form>
        </div>
    );
}
