"use client";

import { NoteItem } from "./note-item";
import { NoteForm } from "./note-form";
import { Note } from "@/types/custom";
import { useOptimistic } from "react";

export type Action = "delete" | "update" | "create";

export function noteReducer(
    state: Array<Note>,
    { action, note }: { action: Action; note: Note }
) {
    switch (action) {
        case "delete":
            return state.filter(({ id }) => id !== note.id);
        case "update":
            return state.map((t) => (t.id === note.id ? note : t));
        case "create":
            return [note, ...state];
        default:
            return state;
    }
}

export type NoteOptimisticUpdate = (action: {
    action: Action;
    note: Note;
}) => void;

export function NoteList({ notes }: { notes: Array<Note> }) {
    const [optimisticNotes, optimisticNotesUpdate] = useOptimistic(
        notes,
        noteReducer
    );
    return (
        <>
            <NoteForm optimisticUpdate={optimisticNotesUpdate} />
            <div className="w-full flex flex-col gap-4">
                {optimisticNotes?.map((note) => {
                    return (
                        <NoteItem
                            optimisticUpdate={optimisticNotesUpdate}
                            note={note}
                            key={note.id}
                        />
                    );
                })}
            </div>
        </>
    );
}