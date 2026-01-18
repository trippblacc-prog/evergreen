const supabaseClient = supabase.createClient(
  "https://kuntfgmqdflbemsbmxjo.supabase.co",
  "sb_publishable_3QFQwO6g1g5ah5QpKL_Feg_uK2pN4Yf"
);

const form = document.getElementById("contact-form");
const successMsg = document.querySelector(".success-msg");

const nameInput = document.getElementById("contact-name");
const emailInput = document.getElementById("contact-email");
const subjectInput = document.getElementById("contact-subject");
const messageInput = document.getElementById("contact-message");

// ⛔ DO NOT CHANGE EXISTING ERROR BEHAVIOR
function getError(input) {
  return input.parentElement.querySelector(".error-msg");
}

function showError(input, message) {
  const error = getError(input);
  if (!error) return;
  error.textContent = message;
  error.style.display = "block";
}

function hideError(input) {
  const error = getError(input);
  if (!error) return;
  error.style.display = "none";
}

function validateForm() {
  let valid = true;

  if (nameInput.value.trim() === "") {
    showError(nameInput, "Name is required");
    valid = false;
  } else hideError(nameInput);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    showError(emailInput, "Enter a valid email");
    valid = false;
  } else hideError(emailInput);

  if (subjectInput.value.trim() === "") {
    showError(subjectInput, "Subject is required");
    valid = false;
  } else hideError(subjectInput);

  if (messageInput.value.trim().length < 10) {
    showError(messageInput, "Message must be at least 10 characters");
    valid = false;
  } else hideError(messageInput);

  return valid;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const { error } = await supabaseClient
    .from("contacts")
    .insert([{
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim()
    }]);

  if (error) {
    console.error(error);
    alert("Message failed to send. Try again.");
    return;
  }

  successMsg.style.display = "block";
  form.reset();

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 3000);
});
