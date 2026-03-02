import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <p>© {new Date().getFullYear()} {profile.name} · {profile.contact.location}</p>
        <p>Languages: {profile.languages.join(" · ")}</p>
      </div>
    </footer>
  );
}
