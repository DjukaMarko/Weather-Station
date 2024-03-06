"use client"
import { Button } from "@/components/ui/button";
import { misauthenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

export default function Page() {
  const [errorMessage, dispatch] = useFormState(misauthenticate, undefined);
  const { pending } = useFormStatus();
  console.log(pending);
  return (
    <div>
      <p>dashboard</p>
      <form action={dispatch}>
        <Button variant={"outline"}>Sign Out</Button>
      </form>
    </div>
  );
}
