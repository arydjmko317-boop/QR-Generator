function ControlPanel({ config, onUpdate }) {
  const [activeTab, setActiveTab] = React.useState('content');

  const contentTypes = [
    { id: 'URL', icon: 'icon-link', label: 'Tautan' },
    { id: 'TEXT', icon: 'icon-file-text', label: 'Teks' },
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
      <div className="bg-gray-50 flex overflow-x-auto no-scrollbar border-b border-gray-100">
        <button 
          onClick={() => setActiveTab('content')}
          className={`tab-btn ${activeTab === 'content' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          01 // Konten
        </button>
        <button 
          onClick={() => setActiveTab('style')}
          className={`tab-btn ${activeTab === 'style' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          02 // Gaya
        </button>
        <button 
          onClick={() => setActiveTab('options')}
          className={`tab-btn ${activeTab === 'options' ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
        >
          03 // Opsi
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'content' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-0 border border-gray-100">
              {contentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => onUpdate({ type: type.id })}
                  className={`flex flex-col items-center justify-center p-4 transition-all border-r border-b border-gray-100 last:border-r-0 ${config.type === type.id ? 'bg-black text-white' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                >
                  <div className={`${type.icon} text-lg mb-2`}></div>
                  <span className="text-[9px] font-bold uppercase tracking-widest">{type.label}</span>
                </button>
              ))}
            </div>

            <div>
              <span className="section-label">01.1 // Input Data</span>
              <label className="block text-xs font-bold text-gray-900 mb-3 uppercase tracking-tighter">Masukan {config.type}</label>
              <textarea 
                name="value"
                value={config.value}
                onChange={handleInputChange}
                rows="4"
                className="input-field resize-none"
                placeholder={`INPUT ${config.type}...`}
              />
            </div>
            
            <div className="p-6 bg-gray-50 border-l-4 border-black">
                <div className="flex gap-4">
                  <div className="icon-info text-black text-lg"></div>
                  <div className="text-[11px] text-gray-600 leading-relaxed uppercase tracking-tight font-medium">
                    QR Code diperbarui secara instan. Pastikan protokol URL lengkap (HTTP/HTTPS) disertakan.
                  </div>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'style' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Warna QR (Dark)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    name="colorDark"
                    value={config.colorDark}
                    onChange={handleInputChange}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
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
                <label className="block text-sm font-semibold text-slate-700 mb-2">Warna Latar (Light)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    name="colorLight"
                    value={config.colorLight}
                    onChange={handleInputChange}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2 border-slate-200"
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
              <label className="block text-sm font-semibold text-slate-700 mb-2">Ukuran Margin ({config.margin}px)</label>
              <input 
                type="range" 
                min="0" 
                max="10" 
                name="margin"
                value={config.margin}
                onChange={handleInputChange}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        )}

        {activeTab === 'options' && (
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Tingkat Koreksi Kesalahan (ECC)</label>
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
                    <p className="text-xs text-slate-500 mt-2 italic">ECC yang lebih tinggi memungkinkan kode tetap dapat dibaca meskipun rusak sebagian, namun membuat kode lebih rapat.</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ukuran Resolusi</label>
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
            </div>
        )}
      </div>
      
      <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
        <button 
          onClick={() => onUpdate({ colorDark: '#000000', colorLight: '#ffffff', margin: 4, errorLevel: 'H' })}
          className="btn btn-secondary"
        >
          <div className="icon-rotate-ccw text-lg"></div>
          Reset
        </button>
      </div>
    </div>
  );
}