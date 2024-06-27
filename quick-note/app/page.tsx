import { Button } from "@/components/ui/button";

import { redirect } from "next/navigation";
import {createClient} from "@/utils/supabase/server";
import {emailLogin} from "@/app/login/actions";

export default async function Home() {
    const [supabase] = await Promise.all([createClient()]);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        return redirect("/notes");
    }
    return (
        <section className="flex items-center justify-center bg-background h-[90vh]">
            <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-16 max-w-7xl md:px-12">
                <div className="max-w-3xl mx-auto text-center">
                    <div>
            <span className="w-auto px-6 py-3 rounded-full bg-secondary">
              <span className="text-sm font-medium text-primary">
                Sort your notes easily
              </span>
            </span>

                        <h1 className="mt-8 text-3xl font-extrabold tracking-tight lg:text-6xl">
                            Create Notes with ease
                        </h1>
                        <p className="max-w-xl mx-auto mt-8 text-base lg:text-xl text-secondary-foreground">
                            Streamlining your world of ideas with a swift, secure, and sophisticated note-taking experience.
                        </p>
                    </div>

                    <div className="flex justify-center max-w-sm mx-auto mt-10">
                        <form action={emailLogin}>
                            <Button size="lg" className="w-full">
                                Sign Up for free
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}