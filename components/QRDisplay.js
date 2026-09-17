function QRDisplay({ config }) {
  const canvasRef = React.useRef(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    generateQR();
  }, [config]);

  const generateQR = async () => {
    if (!canvasRef.current) return;
    setIsGenerating(true);
    try {
      await window.QRCode.toCanvas(canvasRef.current, config.value, {
        width: config.size,
        margin: config.margin,
        color: {
          dark: config.colorDark,
          light: config.colorLight,
        },
        errorCorrectionLevel: config.errorLevel,
      });
    } catch (err) {
      console.error('QR Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQR = (format) => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = `qr-generator-${Date.now()}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  return (
    <div className="rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-5 shadow-[0_18px_45px_rgba(13,37,28,0.08)] sm:p-6" data-name="qr-display" data-file="components/QRDisplay.js">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--primary)]">Preview</p>
          <h3 className="mt-2 text-lg font-black uppercase tracking-tight text-slate-900">Enter content to generate QR</h3>
        </div>
        <div className="rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-500">
          LIVE
        </div>
      </div>

      <div className="relative mx-auto flex aspect-square w-full max-w-[360px] items-center justify-center rounded-[26px] bg-[var(--frame)] p-5 ring-1 ring-[var(--line)]">
        <div className="flex items-center justify-center rounded-[20px] bg-white p-4 shadow-inner ring-1 ring-slate-200">
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', maxWidth: '260px', maxHeight: '260px' }}
            className="block"
          />
        </div>
        {isGenerating && (
          <div className="absolute inset-0 flex items-center justify-center rounded-[26px] bg-white/70 backdrop-blur-[1px]">
            <div className="flex flex-col items-center gap-2">
              <div className="icon-loader animate-spin text-2xl text-[var(--primary)]"></div>
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-700">Generating</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => downloadQR('png')}
          className="rounded-full bg-[var(--primary)] px-5 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-white transition hover:bg-[#123d2f]"
        >
          Download QR
        </button>
        <button
          onClick={() => downloadQR('jpeg')}
          className="rounded-full border border-[var(--primary)] bg-white px-5 py-3 text-[10px] font-black uppercase tracking-[0.24em] text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
        >
          JPG
        </button>
      </div>

      <p className="mt-5 text-center text-[11px] leading-6 text-slate-500">
        High quality output suitable for print and digital use.
      </p>
    </div>
  );
}