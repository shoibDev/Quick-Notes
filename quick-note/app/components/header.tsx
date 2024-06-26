import { Button } from "@/components/ui/button";
import Link from "next/link";
import {createClient} from "@/utils/supabase/server";
import {signOut} from "@/app/login/actions";
import {ThemeToggle} from "@/app/components/theme-toggle";

export default async function Header() {
    const [supabase] = await Promise.all([createClient()]);

    const {
        data : {user}
    } = await supabase.auth.getUser();



    return (
        <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <a className="mr-6 flex items-center space-x-2" href="/">
                        <span className="font-bold">Supa<span className={"text-primary"}>Notes</span></span>
                    </a>
                    <Link href="/notes">notes</Link>
                </nav>
                <div className="flex flex-1 items-center justify-end space-x-2">
                    {user !== null ? (
                        <form action={signOut} className={"flex items-center gap-2"}>
                            <p>{user.email}</p>
                            <Button>Sign Out</Button>
                        </form>
                    ) : (
                        <Button asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    )}
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}