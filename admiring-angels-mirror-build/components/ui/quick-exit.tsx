"use client";

export function QuickExitButton() {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-full border border-black/15 bg-black/5 px-4 py-3 text-sm font-semibold text-black/80 transition hover:-translate-y-[1px] hover:border-rose/35 hover:bg-rose/10"
      title="Quick Exit"
      onClick={() => {
        // Neutral redirect — can be changed to Google, Weather, etc.
        window.location.href = "https://weather.com";
      }}
    >
      Quick Exit
    </button>
  );
}
