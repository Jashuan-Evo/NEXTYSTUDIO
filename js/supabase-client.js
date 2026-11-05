const SUPABASE_URL = "https://weayjlimtpwhjihmmvjl.supabase.co";

// Tempelkan Publishable Key (anon) milikmu di antara tanda petik di bawah ini:
const SUPABASE_ANON_KEY = "PASTE_ANON_KEY_KAMU_DI_SINI";

let supabase = null;

if (typeof window.supabase !== 'undefined') {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase Client Berhasil Terhubung");
} else {
  console.error("Supabase SDK gagal dimuat.");
}
