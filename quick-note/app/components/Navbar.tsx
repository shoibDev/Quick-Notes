import Link from "next/link";
import {ThemeToggle} from "@/app/components/theme-toggle";
import {Button} from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className={"border-b bg-background h-[10vh] flex items-center"}>
            <div className={"container flex items-center justify-between"}>
                <Link href={"/"}>
                    <h1 className={"font-bold text-3xl"}>QuickNotes</h1>
                </Link>

                <div className={"flex items-center gap-x-5"}>
                    <ThemeToggle />

                    <div className={"flex items-center gap-x-5"}>
                        <Button  />
                    </div>
                </div>
            </div>
        </nav>
    )
}