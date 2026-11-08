import { useCallback } from "react";

/** Use a configured enquiry endpoint; never claim an enquiry was sent without one. */
export function useContactForm() {
  return useCallback(async (event) => {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.reportValidity()) return;
    const labels = [...form.querySelectorAll('[data-form-btn] [hover="text"]')];
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    let status = form.querySelector("[data-form-status]");
    if (!status) {
      status = document.createElement("p");
      status.dataset.formStatus = "";
      status.className = "form-status";
      status.setAttribute("role", "status");
      form.appendChild(status);
    }
    if (!endpoint) {
      status.textContent =
        "Online enquiries are not connected yet. Please call +1 (305) 851-2130 or email info@treoconstruction.com to speak with the TREO team.";
      labels.forEach((label) => {
        label.textContent = "Submit";
      });
      return;
    }
    if (form.dataset.sending === "true") return;
    form.dataset.sending = "true";
    // Field mapping mirrors the official TREO enquiry form; `name` keeps older endpoints working.
    const payload = Object.fromEntries(new FormData(form));
    if (payload.first_name || payload.last_name)
      payload.name = [payload.first_name, payload.last_name].filter(Boolean).join(" ");
    labels.forEach((label) => {
      label.textContent = "Sending…";
    });
    status.textContent = "";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Unable to submit enquiry");
      const success = form.parentElement.querySelector(".w-form-done");
      if (success) {
        form.style.display = "none";
        success.style.display = "block";
        success.setAttribute("tabindex", "-1");
        success.focus();
      } else status.textContent = "Thank you. Your enquiry has been sent.";
    } catch {
      status.textContent =
        "Your enquiry could not be sent. Please try again or call +1 (305) 851-2130.";
    } finally {
      delete form.dataset.sending;
      labels.forEach((label) => {
        label.textContent = "Submit";
      });
    }
  }, []);
}
