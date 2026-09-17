function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-sm" data-name="header" data-file="components/Header.js">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-sm">
            <div className="icon-qr-code text-2xl"></div>
          </div>
          <div className="border-l border-slate-200 pl-4 leading-none">
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-black">QR GENERATOR PRO</h1>
            <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500">Aryo Djatmiko Singgih Pratama</span>
          </div>
        </div>

        <div className="hidden md:flex" />

      </div>
    </header>
  );
}