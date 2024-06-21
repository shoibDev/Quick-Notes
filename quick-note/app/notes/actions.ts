"use server"

import { Note } from "@/types/custom";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addNote(formData: FormData) {
    const supabase = createClient();
    const text = formData.get("note") as string | null

    if (!text) {
        throw new Error("Text is required")
    }

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("notes").insert({
        user_id: user.id,
        description: text
    })

    if (error) {
        throw new Error("Error adding task")
    }

    revalidatePath("/notes")
}

export async function deleteNote(id: number) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("notes").delete().match({
        user_id: user.id,
        id: id
    })

    if (error) {
        throw new Error("Error deleting task")
    }

    revalidatePath("/notes")
}

export async function updateNote(note: Note) {


    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error("User is not logged in")
    }

    const { error } = await supabase.from("notes").update(note).match({
        user_id: user.id,
        id: note.id
    })

    if (error) {
        throw new Error("Error updating task")
    }

    revalidatePath("/todos")
}