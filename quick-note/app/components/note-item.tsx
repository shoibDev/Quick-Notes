"use client";
import {deleteNote, updateNote} from "@/app/notes/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Note } from "@/types/custom";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { NoteOptimisticUpdate } from "./note-list";
import { useState } from "react";

export function NoteItem({
                             note,
                             optimisticUpdate,
                         }: {
    note: Note;
    optimisticUpdate: NoteOptimisticUpdate;
}) {
    return (
        <form>
            <NoteCard optimisticUpdate={optimisticUpdate} note={note} />
        </form>
    );
}

export function NoteCard({
                             note,
                             optimisticUpdate,
                         }: {
    note: Note;
    optimisticUpdate: NoteOptimisticUpdate;
}) {
    return (
        <Card className={cn("w-full")}>
            <CardContent className="flex items-start gap-3 p-3">
                <p className={cn("flex-1 pt-2 min-w-0 break-words")}>{note.description}</p>
                <Button
                    formAction={async (data) => {
                        optimisticUpdate({ action: "delete", note });
                        await deleteNote(note.id);
                    }}
                    variant="ghost"
                    size="icon"
                >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Delete Note</span>
                </Button>
            </CardContent>
        </Card>
    );
}