// Important: DO NOT remove this ErrorBoundary component.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="text-center max-w-md">
            <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600">
                <div className="icon-circle-x text-3xl"></div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-6">Aplikasi mengalami kendala teknis. Silakan coba muat ulang halaman.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary w-full"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [config, setConfig] = React.useState({
    value: 'https://ponpeskarangasem.com',
    colorDark: '#1d5c3c',
    colorLight: '#ffffff',
    margin: 2,
    size: 512,
    errorLevel: 'H',
    type: 'URL',
    logoImage: '',
    frame: 'None',
    frameText: 'Pondok Pesantren',
    frameColor: '#1d5c3c',
    frameTextColor: '#ffffff'
  });

  const updateConfig = (newVal) => {
    setConfig(prev => ({ ...prev, ...newVal }));
  };

  try {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--page-bg)] text-slate-800" data-name="app" data-file="app.js">
        <Header />

        <main className="flex-grow">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <div className="mb-8 text-center lg:text-left">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.32em] text-[var(--primary)]">Official QR Code Generator</p>
              <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                QR GENERATOR GRATIS & PRAKTIS
              </h1>
            </div>

            <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
              <div className="order-2 lg:order-1 lg:col-span-7">
                <ControlPanel config={config} onUpdate={updateConfig} />
              </div>

              <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-8">
                <QRDisplay config={config} />
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-8 text-center text-sm text-slate-500">
            <p>© 2026 QR Pro Generator. All rights reserved.</p>
            <p className="mt-2">CREATED BY ARYO DJATMIKO SINGGIH PRATAMA 2026</p>
          </div>
        </footer>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);