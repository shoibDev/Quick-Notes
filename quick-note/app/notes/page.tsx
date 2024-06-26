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
        <div className="p-3">
            <section className="flex-2">
                <NoteList notes={notes ?? []}/>
            </section>

        </div>
    );
}