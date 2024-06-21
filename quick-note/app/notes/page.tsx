import { Separator } from "@/components/ui/separator";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {NoteList} from "@/app/components/note-list";

export default async function TodosPage() {
    const [supabase] = await Promise.all([createClient()]);

    const {
        data : {user}
    } = await supabase.auth.getUser();

    if(!user) {
        return redirect('/login')
    }

    const {data:notes} = await supabase
        .from('notes')
        .select('*')
        .order('created_at', {ascending: false});

    return (
        <section className="p-3 pt-6 max-w-2xl w-full flex flex-col gap-4">
            <NoteList notes={notes ?? []} />
        </section>
    );
}