const supabaseClient = supabase.createClient(
  "https://kuntfgmqdflbemsbmxjo.supabase.co",
  "sb_publishable_3QFQwO6g1g5ah5QpKL_Feg_uK2pN4Yf"
);

// 🚪 LOGOUT
document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabaseClient.auth.signOut();
  window.location.href = "admin-login.html";
});

// 📥 SHOW MESSAGES
function renderMessages(messages) {
  const container = document.getElementById("messages");
  container.innerHTML = "";

  if (messages.length === 0) {
    container.innerHTML = "<p>No messages yet.</p>";
    return;
  }

  messages.forEach(msg => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h4>${msg.name}</h4>
      <p><strong>Email:</strong> ${msg.email}</p>
      <p>${msg.message}</p>
    `;
    container.appendChild(div);
  });
}

// 📡 LOAD MESSAGES
async function fetchMessages() {
  const { data, error } = await supabaseClient
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alert("Failed to load messages");
    return;
  }

  renderMessages(data);
}

fetchMessages();
