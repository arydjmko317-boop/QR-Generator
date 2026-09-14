function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50" data-name="header" data-file="components/Header.js">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-black flex items-center justify-center">
            <div className="icon-qr-code text-white text-xl"></div>
          </div>
          <div className="border-l border-gray-200 pl-4">
            <h1 className="text-sm font-black tracking-[0.2em] text-black leading-none uppercase">QR PRO</h1>
            <span className="text-[9px] font-medium text-gray-400 uppercase tracking-widest mt-1 block">Digital Utility</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">01 // Generator</a>
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">02 // Histori</a>
          <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors">03 // API</a>
        </nav>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex btn btn-secondary text-sm px-4">
            <div className="icon-book-open text-base"></div>
            Panduan
          </button>
          <button className="btn btn-primary text-sm px-4">
            <div className="icon-user-round text-base"></div>
            Masuk
          </button>
        </div>
      </div>
    </header>
  );
}