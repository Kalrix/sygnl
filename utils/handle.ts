import { supabase } from "./supabaseClient";

// ✅ Normalize: remove @ or /, allow only [a-z0-9._]
export const normalizeHandle = (v: string) =>
  v.replace(/^[@/]+/, "").replace(/[^\w.]/g, "").toLowerCase();

// ✅ Valid: must be >=3 chars after normalize
export const isHandleValid = (v: string) => normalizeHandle(v).length >= 3;

// 🔍 Check availability in Supabase
export async function isHandleAvailable(handle: string): Promise<boolean> {
  const h = normalizeHandle(handle);
  if (!isHandleValid(h)) return false;

  const { data, error } = await supabase
    .from("handles")
    .select("id")
    .eq("handle", h)
    .limit(1);

  if (error) {
    console.error("Supabase error:", error);
    throw error;
  }

  return (data?.length ?? 0) === 0;
}

// ✍️ Reserve handle (insert row). Returns ok/taken.
export async function reserveHandle(params: {
  email: string;
  handle: string;
}) {
  const h = normalizeHandle(params.handle);
  const e = params.email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("handles")
    .insert({ handle: h, email: e })
    .select()
    .single();

  if (error) {
    // unique violation → already secured
    if ((error as any).code === "23505") {
      return { ok: false as const, reason: "taken" };
    }
    console.error("Supabase error:", error);
    return { ok: false as const, reason: "error" };
  }

  return { ok: true as const, handle: h, row: data };
}
