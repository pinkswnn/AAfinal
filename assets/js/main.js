// assets/js/main.js (clean, safe, accessible behaviors)
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Year
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth scroll (respect reduced motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  $$("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-scroll");
      const el = target ? $(target) : null;
      if (!el) return;
      el.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
    });
  });

  // Reveal blocks
  $$("[data-reveal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-reveal");
      const panel = id ? $("#" + id) : null;
      if (!panel) return;

      const isHidden = panel.hasAttribute("hidden");
      if (isHidden) {
        panel.removeAttribute("hidden");
        panel.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      } else {
        panel.setAttribute("hidden", "");
      }
    });
  });

  // Copy helper
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied.");
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      toast("Copied.");
    }
  }

  // Tiny toast (non-intrusive)
  let toastTimer = null;
  function toast(msg) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.style.position = "fixed";
      el.style.left = "50%";
      el.style.bottom = "18px";
      el.style.transform = "translateX(-50%)";
      el.style.padding = "10px 14px";
      el.style.borderRadius = "999px";
      el.style.border = "1px solid rgba(16,17,20,.14)";
      el.style.background = "rgba(255,255,255,.92)";
      el.style.boxShadow = "0 10px 24px rgba(16,17,20,.14)";
      el.style.fontWeight = "650";
      el.style.fontSize = "0.95rem";
      el.style.zIndex = "9999";
      el.style.opacity = "0";
      el.style.transition = "opacity .14s ease";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    requestAnimationFrame(() => (el.style.opacity = "1"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.style.opacity = "0"), 1200);
  }

  // Copy email buttons
  $$("[data-email]").forEach(btn => {
    btn.addEventListener("click", () => {
      const email = btn.getAttribute("data-email") || "";
      if (email) copyText(email);
    });
  });

  // Private note: copy + email
  const note = $("#privateNote");
  const copyNote = $("#copyNote");
  const emailNote = $("#emailNote");

  if (copyNote && note) {
    copyNote.addEventListener("click", () => {
      const text = (note.value || "").trim();
      if (!text) return toast("Write a note first.");
      copyText(text);
    });
  }

  if (emailNote && note) {
    emailNote.addEventListener("click", () => {
      const text = (note.value || "").trim();
      if (!text) return toast("Write a note first.");
      const subject = encodeURIComponent("A private note (from my device)");
      const body = encodeURIComponent(text);
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    });
  }

  // Modal (accessible-ish: focus + escape + click outside)
  const modal = $("#connectModal");
  const dialog = modal ? $(".dialog", modal) : null;
  const openers = $$("[data-open-connect]");
  const closers = modal ? $$("[data-close-modal]", modal) : [];

  let lastFocus = null;

  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.classList.add("isOpen");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // Focus first interactive element inside
    const first = $("a,button,[tabindex]:not([tabindex='-1'])", modal);
    (first || dialog)?.focus?.();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("isOpen");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
  }

  openers.forEach(btn => btn.addEventListener("click", openModal));
  closers.forEach(btn => btn.addEventListener("click", closeModal));

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("isOpen")) closeModal();
    });

    // basic focus trap
    modal.addEventListener("keydown", (e) => {
      if (e.key !== "Tab") return;
      const focusables = $$("a,button,textarea,input,select,[tabindex]:not([tabindex='-1'])", modal)
        .filter(el => !el.hasAttribute("disabled"));
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
  }

  // Quiet Mode toggle
  const quietBtn = $("#quietMode");
  const QUIET_KEY = "aa_quiet_mode";

  function setQuiet(on) {
    document.body.classList.toggle("quiet", on);
    if (quietBtn) quietBtn.setAttribute("aria-pressed", String(on));
    try { localStorage.setItem(QUIET_KEY, on ? "1" : "0"); } catch {}
  }

  if (quietBtn) {
    quietBtn.addEventListener("click", () => {
      const on = !document.body.classList.contains("quiet");
      setQuiet(on);
      toast(on ? "Quiet mode on." : "Quiet mode off.");
    });
  }

  // Load quiet preference
  try {
    const saved = localStorage.getItem(QUIET_KEY);
    if (saved === "1") setQuiet(true);
  } catch {}

  // Quick Exit (fast, neutral destination + replaces history)
  const quickExitBtn = $("#quickExit");
  if (quickExitBtn) {
    quickExitBtn.addEventListener("click", () => {
      // Replace current page so back button is less useful
      window.location.replace("https://www.google.com/");
    });
  }
})();
