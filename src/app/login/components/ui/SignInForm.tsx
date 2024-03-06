'use client'

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent } from "react";
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignInForm() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const { pending } = useFormStatus();
    console.log(pending);

    return (
        <div className="w-full">
            <form action={dispatch}>
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
                        aria-disabled={pending}
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
                        aria-disabled={pending}
                    />
                </div>

                <Button variant={"default"} className="w-full mt-6" aria-disabled={pending}>
                    {pending &&
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    }
                    Continue
                </Button>

                {errorMessage &&
                    <Alert className="mt-4" variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            Check your form and try again!
                        </AlertDescription>
                    </Alert>
                }
            </form>
        </div>
    );
}
