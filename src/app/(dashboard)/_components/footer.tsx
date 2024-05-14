import Logo from "@/components/logo";

export default function Footer() {
  const actualYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-4 fixed bottom-0 p-4 border-t bg-slate-100 border flex items-center justify-between">
      <Logo />
      <span className="text-sm text-gray-500">
        ©{actualYear} All rights reserved
      </span>
    </footer>
  );
}
