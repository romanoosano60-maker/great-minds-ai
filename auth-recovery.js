/* Shared Supabase password-recovery request button for Great Minds AI. */
(function () {
  "use strict";
  const button = document.querySelector("[data-gm-forgot-password]");
  if (!button) return;
  const emailInput = document.getElementById(button.dataset.emailInput || "");
  const status = document.getElementById(button.dataset.statusOutput || "");
  button.addEventListener("click", async function () {
    const email = emailInput ? emailInput.value.trim() : "";
    if (!email || !emailInput.checkValidity()) {
      if (status) status.textContent = "Enter a valid account email address first.";
      if (emailInput) emailInput.focus();
      return;
    }
    const db = window.greatMindsDB;
    if (!db || !db.auth || typeof db.auth.resetPasswordForEmail !== "function") {
      if (status) status.textContent = "Password recovery is unavailable because the secure account service did not load.";
      return;
    }
    button.disabled = true;
    if (status) status.textContent = "Requesting a password-recovery email…";
    try {
      const redirectTo = new URL("auth-recovery.html", window.location.href).href;
      const { error } = await db.auth.resetPasswordForEmail(email, { redirectTo });
      if (error) throw error;
      if (status) status.textContent = "If this address belongs to an account, a recovery email will arrive shortly. Check your inbox and spam folder.";
    } catch (error) {
      console.error("Password recovery request failed:", error);
      if (status) status.textContent = "The recovery request could not be completed. Check the email address and try again, or contact the administrator.";
    } finally {
      button.disabled = false;
    }
  });
})();
