/* Supabase password-recovery completion page. */
(function () {
  "use strict";
  const form = document.getElementById("recoveryForm");
  const status = document.getElementById("recoveryStatus");
  const password = document.getElementById("newPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const db = window.greatMindsDB;
  let recoverySessionReady = false;

  function showRecoveryForm() {
    recoverySessionReady = true;
    form.hidden = false;
    status.textContent = "Choose a new password of at least 8 characters.";
  }

  if (!db || !db.auth) {
    status.textContent = "The secure account service did not load. Check your connection and reopen the recovery email.";
    return;
  }

  const { data: listener } = db.auth.onAuthStateChange(function (event) {
    if (event === "PASSWORD_RECOVERY") {
      showRecoveryForm();
    }
  });

  db.auth.getSession().then(function (result) {
    if (result.error) throw result.error;
    const hash = window.location.hash || "";
    if (result.data.session && /(?:^|&)type=recovery(?:&|$)/.test(hash.replace(/^#/, ""))) {
      showRecoveryForm();
    }
  }).catch(function (error) {
    console.warn("Recovery session check failed:", error);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    if (!recoverySessionReady) {
      status.textContent = "Open the latest password-recovery email on this page before choosing a new password.";
      return;
    }
    const nextPassword = password.value;
    if (nextPassword.length < 8) {
      status.textContent = "Use at least 8 characters for the new password.";
      password.focus();
      return;
    }
    if (nextPassword !== confirmPassword.value) {
      status.textContent = "The two passwords do not match.";
      confirmPassword.focus();
      return;
    }
    const submit = form.querySelector("button[type=submit]");
    submit.disabled = true;
    status.textContent = "Updating your password securely…";
    try {
      const { error } = await db.auth.updateUser({ password: nextPassword });
      if (error) throw error;
      password.value = "";
      confirmPassword.value = "";
      form.hidden = true;
      status.textContent = "Your password has been updated. Return to Great Minds AI and sign in with the new password.";
    } catch (error) {
      console.error("Password update failed:", error);
      status.textContent = "The password could not be updated. The recovery link may have expired; request a new one and try again.";
    } finally {
      submit.disabled = false;
    }
  });

  window.addEventListener("pagehide", function () {
    listener.subscription?.unsubscribe();
  });
})();
