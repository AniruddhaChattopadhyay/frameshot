'use client';

interface BrowserMockupProps {
  url: string;
  screenshotSrc: string;
}

export default function BrowserMockup({ url, screenshotSrc }: BrowserMockupProps) {
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <div className="relative">
      {/* Shadow */}
      <div className="absolute inset-0 bg-black/30 blur-3xl transform translate-y-8 scale-95 rounded-3xl" />
      
      {/* Browser Window */}
      <div className="relative bg-gradient-to-b from-gray-700 to-gray-800 rounded-xl overflow-hidden shadow-2xl">
        {/* Title Bar */}
        <div className="bg-gradient-to-b from-gray-600 to-gray-700 px-4 py-3 flex items-center gap-4">
          {/* Traffic Lights */}
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-inner" />
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-inner" />
          </div>
          
          {/* URL Bar */}
          <div className="flex-1 flex justify-center">
            <div className="bg-gray-800/50 rounded-md px-4 py-1.5 flex items-center gap-2 min-w-[300px] max-w-[500px]">
              {/* Lock Icon */}
              <svg className="w-3.5 h-3.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300 text-sm truncate">{displayUrl}</span>
            </div>
          </div>
          
          {/* Spacer for symmetry */}
          <div className="w-14" />
        </div>
        
        {/* Screenshot Content */}
        <div className="relative bg-white">
          <img 
            src={screenshotSrc} 
            alt="Website screenshot"
            className="w-full h-auto block"
          />
        </div>
      </div>
    </div>
  );
}
