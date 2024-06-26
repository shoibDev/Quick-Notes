"use client";
import { addNote } from "@/app/notes/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { NoteOptimisticUpdate } from "./note-list";
import { Note } from "@/types/custom";

function FormContent() {
    const { pending } = useFormStatus();
    return (
        <>
            <Textarea
                disabled={pending}
                minLength={4}
                name="note"
                required
                placeholder="Add a new note"
            />
            <Button type="submit" size="icon" className="min-w-10" disabled={pending}>
                <Send className="h-5 w-5" />
                <span className="sr-only">Submit Note</span>
            </Button>
        </>
    );
}

export function NoteForm({
                             optimisticUpdate,
                         }: {
    optimisticUpdate: NoteOptimisticUpdate;
}) {
    const formRef = useRef<HTMLFormElement>(null);
    return (
        <Card className={"m-3"}>
            <CardContent className="p-3">
                <form
                    ref={formRef}
                    className="flex gap-4"
                    action={async (data) => {
                        const newNote: Note = {
                            created_at: "",
                            description: data.get("note") as string,
                            id: -1,
                            title: "",
                            user_id: "",
                        };
                        optimisticUpdate({ action: "create", note: newNote });
                        await addNote(data);
                        formRef.current?.reset();
                    }}
                >
                    <FormContent />
                </form>
            </CardContent>
        </Card>
    );
}