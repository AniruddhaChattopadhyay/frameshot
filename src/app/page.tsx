'use client';

import { useState } from 'react';
import BrowserMockup from '@/components/BrowserMockup';

const PRESETS = [
  { name: 'Desktop HD', width: 1920, height: 1080, category: 'Desktop' },
  { name: 'Desktop', width: 1440, height: 900, category: 'Desktop' },
  { name: 'Laptop', width: 1366, height: 768, category: 'Desktop' },
  { name: 'Tablet Portrait', width: 768, height: 1024, category: 'Tablet' },
  { name: 'Tablet Landscape', width: 1024, height: 768, category: 'Tablet' },
  { name: 'iPhone 14 Pro', width: 393, height: 852, category: 'Mobile' },
  { name: 'iPhone SE', width: 375, height: 667, category: 'Mobile' },
  { name: 'Android', width: 412, height: 915, category: 'Mobile' },
  { name: 'Twitter Post', width: 1200, height: 675, category: 'Social' },
  { name: 'Instagram Post', width: 1080, height: 1080, category: 'Social' },
  { name: 'LinkedIn Post', width: 1200, height: 627, category: 'Social' },
  { name: 'OG Image', width: 1200, height: 630, category: 'Social' },
];

const ASPECT_RATIOS = [
  { name: '16:9', ratio: 16 / 9 },
  { name: '4:3', ratio: 4 / 3 },
  { name: '1:1', ratio: 1 },
  { name: '9:16', ratio: 9 / 16 },
  { name: '3:2', ratio: 3 / 2 },
];

export default function Home() {
  const [url, setUrl] = useState('');
  const [width, setWidth] = useState(1440);
  const [height, setHeight] = useState(900);
  const [loading, setLoading] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>('Desktop');

  const handlePresetChange = (preset: typeof PRESETS[0]) => {
    setWidth(preset.width);
    setHeight(preset.height);
    setSelectedPreset(preset.name);
  };

  const handleAspectRatioChange = (ratio: number) => {
    setHeight(Math.round(width / ratio));
    setSelectedPreset('Custom');
  };

  const handleCapture = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    let finalUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      finalUrl = 'https://' + url;
    }

    setLoading(true);
    setError(null);
    setScreenshot(null);

    try {
      const response = await fetch('/api/screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl, width, height }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to capture screenshot');
      }

      const data = await response.json();
      setScreenshot(data.screenshot);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!screenshot) return;
    
    const link = document.createElement('a');
    link.href = screenshot;
    link.download = `frameshot-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            📸 FrameShot
          </h1>
          <p className="text-xl text-purple-200">
            Beautiful browser screenshots in seconds
          </p>
        </div>

        {/* Input Section */}
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          {/* URL Input */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-2">
              Website URL
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyDown={(e) => e.key === 'Enter' && handleCapture()}
              />
              <button
                onClick={handleCapture}
                disabled={loading}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Capturing...
                  </span>
                ) : (
                  'Capture'
                )}
              </button>
            </div>
          </div>

          {/* Presets */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-3">
              Size Presets
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetChange(preset)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    selectedPreset === preset.name
                      ? 'bg-purple-600 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratios */}
          <div className="mb-6">
            <label className="block text-white text-sm font-medium mb-3">
              Aspect Ratio
            </label>
            <div className="flex gap-2">
              {ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.name}
                  onClick={() => handleAspectRatioChange(ar.ratio)}
                  className="px-4 py-2 rounded-lg bg-white/10 text-white/70 hover:bg-white/20 transition-colors"
                >
                  {ar.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Width (px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => {
                  setWidth(Number(e.target.value));
                  setSelectedPreset('Custom');
                }}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Height (px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => {
                  setHeight(Number(e.target.value));
                  setSelectedPreset('Custom');
                }}
                className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Current Size Display */}
          <div className="mt-4 text-center text-white/50 text-sm">
            Output size: {width} × {height}px
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="max-w-4xl mx-auto mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        {/* Screenshot Preview */}
        {screenshot && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">Preview</h2>
              <button
                onClick={handleDownload}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PNG
              </button>
            </div>
            <BrowserMockup url={url} screenshotSrc={screenshot} />
          </div>
        )}

        {/* Empty State */}
        {!screenshot && !loading && (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="text-6xl mb-4">🖼️</div>
            <p className="text-white/50 text-lg">
              Enter a URL above to capture a beautiful screenshot
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
