// /app/connect/page.tsx

export const metadata = {
  title: "Connect",
};
// /api/square/oauth/start
export default function ConnectPage() {
  return (
    <div className="">
      <a
        href="/api/square/oauth/start"
        className="
    relative inline-flex items-center justify-center
    px-6 py-3 rounded-lg
    text-sm font-semibold tracking-wide text-black
    bg-stone-300/10 backdrop-blur-md
    border border-stone-600/20
    shadow-lg
    transition-all duration-300 ease-out
    hover:bg-white/20 hover:shadow-xl
    hover:scale-[1.03]
    active:scale-[0.98]
    overflow-hidden
  "
      >
        <span className="relative z-10">Connect Square</span>

        {/* subtle gradient glow */}
        <span
          className="
    absolute inset-0 rounded-full
    bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0%,transparent_70%)]
    opacity-0
    transition-opacity duration-300
    group-hover:opacity-100
  "
        />
      </a>
    </div>
  );
}

