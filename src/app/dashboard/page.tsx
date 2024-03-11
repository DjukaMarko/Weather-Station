"use client"
import { Button } from "@/components/ui/button";
import { misauthenticate } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";
import { Feather, LayoutGrid, LogOut } from "lucide-react";
import Sidebar from "@/components/ui/Sidebar";
import { LayoutGroup } from "framer-motion";
import useWindowDimensions from "@/components/hooks/useWindowDimensions";
import MobileNavbar from "@/components/ui/MobileNavbar";
import { useEffect, useState } from "react";
import MobileNavbarOptions from "@/components/ui/MobileNavbarOptions";

export default function Page() {
  const { width } = useWindowDimensions();

  const [isNavbarClicked, setNavbarClicked] = useState(false);
  useEffect(() => {
    width > 500 && setNavbarClicked(false);
  }, [width]);
  return (
    <div className="relative w-full h-screen bg-zinc-900 flex flex-col box-border">
      {width > 500 ? <Sidebar /> : <MobileNavbar isClicked={isNavbarClicked} setClicked={setNavbarClicked} />}
      <MobileNavbarOptions isClicked={isNavbarClicked} setClicked={setNavbarClicked} />
    </div>
  );
}
