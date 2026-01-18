const supabaseClient = supabase.createClient(
  "https://kuntfgmqdflbemsbmxjo.supabase.co",
  "sb_publishable_3QFQwO6g1g5ah5QpKL_Feg_uK2pN4Yf"
);

const form = document.getElementById("admin-login-form");
const errorBox = document.getElementById("auth-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.classList.add("hidden");

  const email = document.getElementById("admin-email").value.trim();
  const password = document.getElementById("admin-password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    errorBox.textContent = error.message;
    errorBox.classList.remove("hidden");
    return;
  }

  window.location.href = "dashboard.html";
});
