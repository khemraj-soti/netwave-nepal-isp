import React, { useState, useEffect } from 'react';
import { 
  Gauge, 
  Play, 
  RotateCcw, 
  Server, 
  Radio, 
  CheckCircle2, 
  ArrowDown, 
  ArrowUp, 
  Activity, 
  ShieldCheck,
  Zap,
  Globe2
} from 'lucide-react';
import { SpeedTestResult } from '../types';

interface SpeedTestPageProps {
  onOpenOrderModal: (planId?: string) => void;
  onOpenWaveBot: () => void;
}

export const SpeedTestPage: React.FC<SpeedTestPageProps> = ({ onOpenOrderModal, onOpenWaveBot }) => {
  const [selectedServer, setSelectedServer] = useState('Kathmandu Core NOC (10G Ring)');
  const [testState, setTestState] = useState<'idle' | 'ping' | 'download' | 'upload' | 'finished'>('idle');
  
  // Real-time animated counters
  const [currentSpeed, setCurrentSpeed] = useState(0);
  const [ping, setPing] = useState(0);
  const [jitter, setJitter] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [packetLoss, setPacketLoss] = useState(0);

  const [history, setHistory] = useState<SpeedTestResult[]>([
    {
      id: 'st-1',
      timestamp: 'Today, 11:20 AM',
      server: 'Kathmandu Core NOC (10G Ring)',
      pingMs: 2,
      jitterMs: 0.3,
      downloadMbps: 298.4,
      uploadMbps: 301.2,
      packetLoss: 0.0,
      isp: 'NetWave Nepal FTTH',
    }
  ]);

  const runTest = () => {
    setTestState('ping');
    setCurrentSpeed(0);
    setPing(0);
    setJitter(0);
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPacketLoss(0);

    // Step 1: Ping & Jitter
    let pTime = 0;
    const pingInterval = setInterval(() => {
      pTime += 100;
      setPing(Math.floor(2 + Math.random() * 3));
      setJitter(parseFloat((0.2 + Math.random() * 0.4).toFixed(2)));
      if (pTime >= 1200) {
        clearInterval(pingInterval);
        startDownload();
      }
    }, 100);
  };

  const startDownload = () => {
    setTestState('download');
    let speedVal = 0;
    const targetDownload = 300 + Math.floor(Math.random() * 15);
    const dlInterval = setInterval(() => {
      if (speedVal < targetDownload) {
        speedVal += 18 + Math.random() * 10;
        setCurrentSpeed(parseFloat(speedVal.toFixed(1)));
      } else {
        const finalDl = parseFloat((targetDownload + Math.random() * 2).toFixed(1));
        setCurrentSpeed(finalDl);
        setDownloadSpeed(finalDl);
        clearInterval(dlInterval);
        setTimeout(startUpload, 600);
      }
    }, 80);
  };

  const startUpload = () => {
    setTestState('upload');
    let speedVal = 0;
    const targetUpload = 295 + Math.floor(Math.random() * 12);
    const ulInterval = setInterval(() => {
      if (speedVal < targetUpload) {
        speedVal += 16 + Math.random() * 10;
        setCurrentSpeed(parseFloat(speedVal.toFixed(1)));
      } else {
        const finalUl = parseFloat((targetUpload + Math.random() * 2).toFixed(1));
        setCurrentSpeed(finalUl);
        setUploadSpeed(finalUl);
        clearInterval(ulInterval);

        // Finished
        setTimeout(() => {
          setTestState('finished');
          const newResult: SpeedTestResult = {
            id: `st-${Date.now()}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            server: selectedServer,
            pingMs: ping || 2,
            jitterMs: jitter || 0.4,
            downloadMbps: downloadSpeed || 301.5,
            uploadMbps: finalUl,
            packetLoss: 0.0,
            isp: 'NetWave Nepal FTTH',
          };
          setHistory(prev => [newResult, ...prev]);
        }, 500);
      }
    }, 80);
  };

  // Angle math for gauge
  const maxDial = 500;
  const clampedVal = Math.min(currentSpeed, maxDial);
  const angle = (clampedVal / maxDial) * 180 - 90; // -90 to +90 deg

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 text-slate-100">
      {/* 1. Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          Certified ISP Speed Test
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          NetWave Fiber Speedometer
        </h1>
        <p className="text-sm text-slate-300">
          Measure true symmetric download, upload bandwidth, jitter, and latency against Nepal's Tier-1 fiber nodes.
        </p>
      </div>

      {/* 2. Main Speedometer Dial Container */}
      <div className="max-w-3xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-8">
        {/* Server & Connection info bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Test Server Node</span>
              <select
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                disabled={testState !== 'idle' && testState !== 'finished'}
                className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
              >
                <option value="Kathmandu Core NOC (10G Ring)">Kathmandu Core NOC (10G Ring)</option>
                <option value="Pokhara Gandaki Gateway">Pokhara Gandaki Gateway</option>
                <option value="Singapore Tier-1 Direct Link">Singapore Tier-1 Direct Link (Gaming)</option>
                <option value="Mumbai AWS Direct Connect">Mumbai AWS Direct Connect</option>
              </select>
            </div>
          </div>

          <div className="text-right">
            <span className="text-slate-400 text-[10px] block">Detected Network / Provider</span>
            <strong className="text-cyan-400 font-mono text-xs">NetWave Nepal (IPv6 Native)</strong>
          </div>
        </div>

        {/* The Animated Speed Dial Visual */}
        <div className="relative flex flex-col items-center justify-center py-6">
          {/* Circular SVG Arc */}
          <div className="relative w-64 h-36 flex items-end justify-center">
            <svg className="w-64 h-64 absolute -top-12" viewBox="0 0 200 200">
              {/* Background Arc */}
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke="#1e293b"
                strokeWidth="12"
                strokeDasharray="235.6"
                strokeDashoffset="117.8"
                transform="rotate(180 100 100)"
              />
              {/* Active Glow Arc */}
              <circle
                cx="100"
                cy="100"
                r="75"
                fill="none"
                stroke="url(#speedGrad)"
                strokeWidth="12"
                strokeDasharray="235.6"
                strokeDashoffset={235.6 - (clampedVal / maxDial) * 117.8}
                transform="rotate(180 100 100)"
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            {/* Needle */}
            <div
              className="absolute w-1 h-24 bg-gradient-to-t from-cyan-400 to-white rounded-full origin-bottom transition-transform duration-100 shadow-lg shadow-cyan-400/50"
              style={{ transform: `rotate(${angle}deg)` }}
            ></div>

            {/* Pivot */}
            <div className="w-4 h-4 rounded-full bg-white shadow-md z-10"></div>
          </div>

          {/* Big Number Output */}
          <div className="text-center mt-4 space-y-1">
            <div className="text-6xl sm:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 font-sans tracking-tight">
              {currentSpeed.toFixed(1)}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {testState === 'download'
                ? 'Testing Download Throughput (Mbps)...'
                : testState === 'upload'
                ? 'Testing Upload Throughput (Mbps)...'
                : testState === 'ping'
                ? 'Measuring Latency & Jitter...'
                : testState === 'finished'
                ? 'Test Complete (Mbps)'
                : 'Megabits Per Second (Mbps)'}
            </p>
          </div>

          {/* Action Trigger Button */}
          <div className="mt-8">
            {testState === 'idle' || testState === 'finished' ? (
              <button
                onClick={runTest}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 hover:from-cyan-300 hover:to-teal-200 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
              >
                {testState === 'finished' ? <RotateCcw className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                <span>{testState === 'finished' ? 'Run Test Again' : 'Start Speed Test'}</span>
              </button>
            ) : (
              <div className="px-6 py-3 bg-slate-800 text-cyan-400 text-xs font-bold rounded-xl border border-slate-700 flex items-center space-x-2 animate-pulse">
                <Radio className="w-4 h-4" />
                <span>Running Test...</span>
              </div>
            )}
          </div>
        </div>

        {/* Metric Cards Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center">
              <Activity className="w-3 h-3 text-cyan-400 mr-1" /> Ping Latency
            </span>
            <p className="text-xl font-black text-white font-mono">{ping ? `${ping} ms` : '--'}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center">
              <Radio className="w-3 h-3 text-purple-400 mr-1" /> Jitter
            </span>
            <p className="text-xl font-black text-white font-mono">{jitter ? `${jitter} ms` : '--'}</p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center">
              <ArrowDown className="w-3 h-3 text-emerald-400 mr-1" /> Download
            </span>
            <p className="text-xl font-black text-emerald-400 font-mono">
              {downloadSpeed ? `${downloadSpeed} Mbps` : '--'}
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center justify-center">
              <ArrowUp className="w-3 h-3 text-blue-400 mr-1" /> Upload
            </span>
            <p className="text-xl font-black text-blue-400 font-mono">
              {uploadSpeed ? `${uploadSpeed} Mbps` : '--'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. History Log */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h3 className="text-base font-bold text-white">Recent Speed Test History</h3>
        <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg">
          <div className="divide-y divide-slate-800 text-xs">
            {history.map((h) => (
              <div key={h.id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3 hover:bg-slate-800/40">
                <div>
                  <p className="font-bold text-white">{h.server}</p>
                  <p className="text-[10px] text-slate-500">{h.timestamp} • {h.isp}</p>
                </div>

                <div className="flex items-center space-x-6">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Ping:</span>
                    <strong className="text-white font-mono">{h.pingMs} ms</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Download:</span>
                    <strong className="text-emerald-400 font-mono">{h.downloadMbps} Mbps</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Upload:</span>
                    <strong className="text-blue-400 font-mono">{h.uploadMbps} Mbps</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
