const supabaseClient = supabase.createClient(
  "https://kuntfgmqdflbemsbmxjo.supabase.co",
  "sb_publishable_3QFQwO6g1g5ah5QpKL_Feg_uK2pN4Yf"
);

(async () => {
  const { data: { user } } = await supabaseClient.auth.getUser();

  if (!user) {
    window.location.href = "admin-login.html";
  }
})();
