const SUPABASE_URL = "https://weayjlimtpwhjihmmvjl.supabase.co";

// Tempelkan Publishable Key (anon) milikmu di antara tanda petik di bawah ini:
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndlYXlqbGltdHB3aGppaG1tdmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM4ODQyMjgsImV4cCI6MjEwOTQ2MDIyOH0.QZjSPfj9cT8vI0QxJvpajaHLADo6-FBY4KAOIRWhPUA";

let supabase = null;

if (typeof window.supabase !== 'undefined') {
  supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log("Supabase Client Berhasil Terhubung");
} else {
  console.error("Supabase SDK gagal dimuat.");
}
