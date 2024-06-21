import {Database} from "@/types/supabase";

export type Note = Database["public"]["Tables"]["notes"]["Row"];