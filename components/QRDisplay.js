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
    link.download = `qr-pro-${Date.now()}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  };

  return (
    <div className="card p-10 flex flex-col items-center gap-8" data-name="qr-display" data-file="components/QRDisplay.js">
      <div className="w-full flex flex-col items-start">
        <span className="section-label">02 // Pratinjau</span>
        <h3 className="text-sm font-black text-black uppercase tracking-[0.2em]">Live Output</h3>
      </div>

      <div className="relative group p-8 bg-gray-50 border border-gray-100 w-full max-w-[340px] mx-auto flex items-center justify-center transition-all duration-500 aspect-square">
        <div className="bg-white p-4 border border-gray-200 flex items-center justify-center overflow-hidden">
          <canvas 
            ref={canvasRef} 
            style={{ width: '100%', height: '100%', maxWidth: '240px', maxHeight: '240px' }}
            className="block grayscale contrast-125"
          />
        </div>
        {isGenerating && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="icon-loader animate-spin text-2xl text-black"></div>
              <span className="text-[9px] font-bold text-black tracking-[0.3em] uppercase">Generating</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-3">
        <button 
          onClick={() => downloadQR('png')}
          className="btn btn-primary w-full"
        >
          Download PNG
        </button>
        <button 
          onClick={() => downloadQR('jpeg')}
          className="btn btn-secondary w-full"
        >
          Download JPG
        </button>
      </div>

      <p className="text-xs text-slate-400 text-center">
        Pindai kode di atas untuk menguji kebenaran data. <br/>
        Gunakan kontras warna yang tinggi untuk keterbacaan optimal.
      </p>
    </div>
  );
}