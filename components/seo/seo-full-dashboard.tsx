'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Zap, Settings, Download, Plus, X, Loader } from 'lucide-react';

export default function SeoFullDashboard() {
  const [activeTab, setActiveTab] = useState<'keywords' | 'pages' | 'alt-text' | 'robots'>('keywords');
  const [keywords, setKeywords] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [generatedAltTexts, setGeneratedAltTexts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [robots, setRobots] = useState<any>(null);

  useEffect(() => {
    fetchKeywords();
    fetchRobots();
  }, []);

  const fetchKeywords = async () => {
    try {
      const res = await fetch('/api/seo/keywords');
      const data = await res.json();
      if (data.success) setKeywords(data.data);
    } catch (error) {
      console.error('Failed to fetch keywords:', error);
    }
  };

  const fetchRobots = async () => {
    try {
      const res = await fetch('/api/seo/robots');
      const data = await res.json();
      if (data.success) setRobots(data.data);
    } catch (error) {
      console.error('Failed to fetch robots.txt:', error);
    }
  };

  const generateAltText = async () => {
    if (!imageUrl.trim()) {
      alert('Please enter image URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/seo/ai/alt-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl })
      });

      const data = await res.json();
      if (data.success) {
        setGeneratedAltTexts(data.data.altTexts);
      } else {
        alert('Failed to generate alt text: ' + data.error);
      }
    } catch (error) {
      alert('Error generating alt text');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRobots = async (newRobots: any) => {
    try {
      const res = await fetch('/api/seo/robots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRobots)
      });

      const data = await res.json();
      if (data.success) {
        setRobots(data.data);
        alert('Robots.txt updated successfully!');
      }
    } catch (error) {
      alert('Failed to update robots.txt');
    }
  };

  const downloadRobots = async () => {
    try {
      const res = await fetch('/api/seo/robots', { method: 'PUT' });
      const text = await res.text();
      
      const blob = new Blob([text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'robots.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      alert('Failed to download robots.txt');
    }
  };

  return (
    <div className="space-y-6 w-full">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 pb-4 overflow-x-auto">
        {[
          { id: 'keywords', label: '🔑 Keywords' },
          { id: 'pages', label: '📄 Pages' },
          { id: 'alt-text', label: '🤖 Alt Text AI' },
          { id: 'robots', label: '🤖 Robots.txt' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 font-bold text-sm whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'border-b-2 border-[#D4AF37] text-[#D4AF37]'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Alt Text AI Tab */}
      {activeTab === 'alt-text' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-8 space-y-6"
        >
          <h3 className="text-2xl font-bold text-[#D4AF37] flex items-center gap-2">
            <Zap size={24} /> AI Alt Text Generator
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Image URL</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-black border border-white/20 p-4 rounded-xl text-white outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              onClick={generateAltText}
              disabled={loading}
              className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={18} className="animate-spin" /> Generating...
                </>
              ) : (
                <>
                  <Zap size={18} /> Generate Alt Text
                </>
              )}
            </button>
          </div>

          {generatedAltTexts.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-white">Generated Alt Texts:</h4>
              {generatedAltTexts.map((alt, i) => (
                <div key={i} className="p-4 bg-black border border-green-500/30 rounded-xl flex items-center justify-between gap-4">
                  <p className="text-sm text-gray-300">{alt}</p>
                  <button
                    onClick={() => navigator.clipboard.writeText(alt)}
                    className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded hover:bg-green-500 hover:text-black transition"
                  >
                    Copy
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Robots.txt Tab */}
      {activeTab === 'robots' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-[#111] border border-white/10 rounded-2xl p-8 space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-[#D4AF37] flex items-center gap-2">
              <Settings size={24} /> Robots.txt Configuration
            </h3>
            <button
              onClick={downloadRobots}
              className="px-6 py-3 bg-blue-500/20 text-blue-400 font-bold rounded-xl hover:bg-blue-500 hover:text-white transition flex items-center gap-2"
            >
              <Download size={18} /> Download
            </button>
          </div>

          {robots && (
            <div className="space-y-6">
              {/* User Agent */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">User-Agent</label>
                <input
                  type="text"
                  defaultValue={robots.userAgent}
                  onChange={(e) => setRobots({ ...robots, userAgent: e.target.value })}
                  className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Disallow Paths */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Disallow Paths (comma-separated)</label>
                <textarea
                  defaultValue={robots.disallow?.join(', ')}
                  onChange={(e) => setRobots({ ...robots, disallow: e.target.value.split(',').map((p: string) => p.trim()) })}
                  className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37] h-24"
                  placeholder="/admin, /api, /private"
                />
              </div>

              {/* Sitemaps */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Sitemaps (one per line)</label>
                <textarea
                  defaultValue={robots.sitemaps?.join('\n')}
                  onChange={(e) => setRobots({ ...robots, sitemaps: e.target.value.split('\n').filter((s: string) => s.trim()) })}
                  className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37] h-20"
                  placeholder="https://yourdomain.com/sitemap.xml"
                />
              </div>

              {/* Crawl Delay */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">Crawl Delay (seconds)</label>
                <input
                  type="number"
                  defaultValue={robots.crawlDelay || 1}
                  onChange={(e) => setRobots({ ...robots, crawlDelay: parseInt(e.target.value) })}
                  className="w-full bg-black border border-white/20 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                onClick={() => updateRobots(robots)}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-white transition-all"
              >
                Save Robots.txt Configuration
              </button>
            </div>
          )}

          {/* Preview */}
          <div className="mt-8">
            <h4 className="font-bold text-white mb-3">Preview:</h4>
            <pre className="bg-black border border-white/20 p-4 rounded-xl text-green-400 text-sm overflow-auto max-h-64">
{`User-agent: ${robots?.userAgent || '*'}
${robots?.disallow?.map((p: string) => `Disallow: ${p}`).join('\n')}
${robots?.sitemaps?.map((s: string) => `Sitemap: ${s}`).join('\n')}
${robots?.crawlDelay ? `Crawl-delay: ${robots.crawlDelay}` : ''}`}
            </pre>
          </div>
        </motion.div>
      )}

      {/* Keywords Tab Placeholder */}
      {activeTab === 'keywords' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#111] border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">📊 Keyword Tracking</h3>
          <p className="text-gray-400">Tracking {keywords.length} keywords...</p>
          {keywords.length === 0 && (
            <button className="mt-4 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-xl">
              + Add Keyword
            </button>
          )}
        </motion.div>
      )}
    </div>
  );
}