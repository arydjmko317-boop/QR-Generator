function ControlPanel({ config, onUpdate }) {
  const [activeTab, setActiveTab] = React.useState('content');

  const contentTypes = [
    { id: 'URL', icon: 'icon-link', label: 'Link' },
    { id: 'TEXT', icon: 'icon-file-text', label: 'Text' },
    { id: 'EMAIL', icon: 'icon-mail', label: 'Email' },
    { id: 'WIFI', icon: 'icon-wifi', label: 'WiFi' },
    { id: 'VCARD', icon: 'icon-user-round', label: 'VCard' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  return (
    <div className="card flex flex-col overflow-hidden" data-name="control-panel" data-file="components/ControlPanel.js">
      <div className="flex border-b border-[var(--line)] bg-white/70 backdrop-blur-sm">
        <button
          onClick={() => setActiveTab('content')}
          className={`tab-btn ${activeTab === 'content' ? 'border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          01 // Konten
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`tab-btn ${activeTab === 'style' ? 'border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          02 // Gaya
        </button>
        <button
          onClick={() => setActiveTab('options')}
          className={`tab-btn ${activeTab === 'options' ? 'border-[var(--primary)] bg-[var(--accent)] text-[var(--primary)]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          03 // Opsi
        </button>
      </div>

      <div className="p-5 sm:p-7">
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => onUpdate({ type: type.id })}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-3 transition-all ${config.type === type.id ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-sm' : 'border-[var(--line)] bg-white text-slate-500 hover:border-[var(--primary)] hover:text-[var(--primary)]'}`}
                >
                  <div className={`${type.icon} text-lg mb-2`}></div>
                  <span className="text-[9px] font-black uppercase tracking-[0.18em]">{type.label}</span>
                </button>
              ))}
            </div>

            <div>
              <span className="section-label">01.1 // Input Data</span>
              <label className="mb-3 block text-xs font-black uppercase tracking-[0.16em] text-slate-700">
                Masukan {config.type}
              </label>
              <textarea
                name="value"
                value={config.value}
                onChange={handleInputChange}
                rows="4"
                className="input-field resize-none"
                placeholder={`Input ${config.type}...`}
              />
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-[var(--accent)] p-4">
              <div className="flex items-start gap-3">
                <div className="icon-info mt-0.5 text-base text-[var(--primary)]"></div>
                <div className="text-[11px] leading-6 font-medium uppercase tracking-tight text-slate-700">
                  QR Code diperbarui secara instan. Pastikan protokol URL lengkap (HTTP/HTTPS) disertakan.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Warna QR (Foreground)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="colorDark"
                    value={config.colorDark}
                    onChange={handleInputChange}
                    className="h-12 w-12 cursor-pointer rounded-xl border-2 border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    name="colorDark"
                    value={config.colorDark}
                    onChange={handleInputChange}
                    className="input-field text-center font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">Warna Latar (Background)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    name="colorLight"
                    value={config.colorLight}
                    onChange={handleInputChange}
                    className="h-12 w-12 cursor-pointer rounded-xl border-2 border-slate-200 bg-white"
                  />
                  <input
                    type="text"
                    name="colorLight"
                    value={config.colorLight}
                    onChange={handleInputChange}
                    className="input-field text-center font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Margin / Padding: {config.margin}</label>
              <input
                type="range"
                min="0"
                max="10"
                name="margin"
                value={config.margin}
                onChange={handleInputChange}
                className="h-2 w-full cursor-pointer accent-[var(--primary)]"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-slate-700">Add Frame</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {['None', 'Bottom Bar', 'Top Header', 'Outline', 'Bubble Top', 'Bubble Bottom'].map((frame) => (
                  <button
                    key={frame}
                    className="rounded-xl border border-[var(--line)] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-slate-600 transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    {frame}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'options' && (
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Tingkat Koreksi Kesalahan (ECC)</label>
              <select
                name="errorLevel"
                value={config.errorLevel}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%) - Rekomendasi</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">Ukuran Resolusi</label>
              <select
                name="size"
                value={config.size}
                onChange={handleInputChange}
                className="input-field"
              >
                <option value="256">256 x 256 px</option>
                <option value="512">512 x 512 px</option>
                <option value="1024">1024 x 1024 px</option>
              </select>
            </div>

            <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
              <p className="text-sm font-bold text-slate-700">Upload Logo</p>
              <button className="mt-3 w-full rounded-xl border border-dashed border-[var(--primary)] bg-[var(--accent)] px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--primary)]">
                Upload Logo
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-[var(--line)] bg-[var(--panel)] p-4">
        <button
          onClick={() => onUpdate({ colorDark: '#1d5c3c', colorLight: '#ffffff', margin: 2, errorLevel: 'H' })}
          className="btn btn-secondary"
        >
          <div className="icon-rotate-ccw text-base"></div>
          Reset
        </button>
      </div>
    </div>
  );
}