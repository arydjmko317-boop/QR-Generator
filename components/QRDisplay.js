function QRDisplay({ config }) {
  const canvasRef = React.useRef(null);
  const [isGenerating, setIsGenerating] = React.useState(false);

  React.useEffect(() => {
    generateQR();
  }, [config]);

  const drawLogoOnCanvas = (canvas, logoImage) => {
    if (!logoImage || !canvas) return;

    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const logoSize = Math.max(Math.min(size * 0.22, 110), 48);
    const x = (size - logoSize) / 2;
    const y = (size - logoSize) / 2;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;

    const radius = 18;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + logoSize - radius, y);
    ctx.quadraticCurveTo(x + logoSize, y, x + logoSize, y + radius);
    ctx.lineTo(x + logoSize, y + logoSize - radius);
    ctx.quadraticCurveTo(x + logoSize, y + logoSize, x + logoSize - radius, y + logoSize);
    ctx.lineTo(x + radius, y + logoSize);
    ctx.quadraticCurveTo(x, y + logoSize, x, y + logoSize - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    const img = new Image();
    img.onload = () => {
      const logoPadding = 10;
      const drawSize = logoSize - logoPadding * 2;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + radius, y + logoPadding);
      ctx.lineTo(x + logoSize - radius, y + logoPadding);
      ctx.quadraticCurveTo(x + logoSize - logoPadding, y + logoPadding, x + logoSize - logoPadding, y + radius + logoPadding);
      ctx.lineTo(x + logoSize - logoPadding, y + logoSize - radius - logoPadding);
      ctx.quadraticCurveTo(x + logoSize - logoPadding, y + logoSize - logoPadding, x + logoSize - radius - logoPadding, y + logoSize - logoPadding);
      ctx.lineTo(x + radius + logoPadding, y + logoSize - logoPadding);
      ctx.quadraticCurveTo(x + logoPadding, y + logoSize - logoPadding, x + logoPadding, y + logoSize - radius - logoPadding);
      ctx.lineTo(x + logoPadding, y + radius + logoPadding);
      ctx.quadraticCurveTo(x + logoPadding, y + logoPadding, x + radius + logoPadding, y + logoPadding);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, x + logoPadding, y + logoPadding, drawSize, drawSize);
      ctx.restore();
    };
    img.src = logoImage;
    ctx.restore();
  };

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

      drawLogoOnCanvas(canvasRef.current, config.logoImage);
    } catch (err) {
      console.error('QR Generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderFrameOverlay = () => {
    if (!config.frame || config.frame === 'None') return null;

    const commonFrameClass = 'absolute left-1/2 -translate-x-1/2 rounded-full border border-slate-200 bg-white shadow-sm';

    switch (config.frame) {
      case 'Bottom Bar':
        return (
          <div className="absolute -bottom-3 left-1/2 w-[78%] -translate-x-1/2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="h-2 w-full rounded-full bg-[var(--primary)]/10" />
          </div>
        );
      case 'Top Header':
        return (
          <div className="absolute -top-3 left-1/2 w-[72%] -translate-x-1/2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <div className="h-2 w-full rounded-full bg-[var(--primary)]/15" />
          </div>
        );
      case 'Outline':
        return <div className="absolute inset-0 rounded-[26px] border-4 border-[var(--primary)]/20" />;
      case 'Bubble Top':
        return <div className={`${commonFrameClass} top-[-12px] h-8 w-8`} />;
      case 'Bubble Bottom':
        return <div className={`${commonFrameClass} bottom-[-12px] h-8 w-8`} />;
      default:
        return null;
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
        {renderFrameOverlay()}
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