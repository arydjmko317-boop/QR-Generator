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
    value: 'https://trickle.so',
    colorDark: '#000000',
    colorLight: '#ffffff',
    margin: 4,
    size: 512,
    errorLevel: 'H',
    type: 'URL'
  });

  const updateConfig = (newVal) => {
    setConfig(prev => ({ ...prev, ...newVal }));
  };

  try {
    return (
      <div className="min-h-screen flex flex-col" data-name="app" data-file="app.js">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Control Panel - Left Side */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <ControlPanel config={config} onUpdate={updateConfig} />
            </div>

            {/* QR Preview - Right Side */}
            <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-8">
              <QRDisplay config={config} />
            </div>

          </div>
        </main>

        <footer className="py-8 border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© 2026 QR Pro Generator. All rights reserved.</p>
            <p className="mt-2">CREATED BY ARYO DJATMIKO SINGGIH PRATAMA 2026</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="hover:text-indigo-600">Privacy</a>
              <a href="#" className="hover:text-indigo-600">Terms</a>
              <a href="https://x.com/Trickle_HQ" target="_blank" className="hover:text-indigo-600">Twitter</a>
            </div>
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