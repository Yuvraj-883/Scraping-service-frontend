import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import BulkResults from './BulkResults';

const BulkScraper = () => {
  const [url, setUrl] = useState('');
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Starting bulk scrape for:', url, 'with limit:', limit);
    setLoading(true);
    setResult(null);

    try {
      console.log('📡 Making API call to:', 'https://api.dev.baisahab.com/articles/scraper/bulk');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://api.dev.baisahab.com/articles'}/scraper/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, limit }),
        mode: 'cors'
      });
      console.log('📥 Response status:', response.status);
      const data = await response.json();
      console.log('✅ API response received:', data);
      console.log('💾 Setting result state with data');
      setResult(data);
    } catch (error) {
      console.error('❌ API call failed:', error);
      console.log('💾 Setting error result state');
      setResult({
        success: false,
        sourceUrl: url,
        totalFound: 0,
        scraped: 0,
        articles: [],
        error: 'Failed to bulk scrape'
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Bulk Scrape Articles</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category/Section URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="https://example.com/category"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Number of Articles</label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              min="1"
              max="20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
          >
            <i className="fas fa-download mr-2"></i>
            {loading ? 'Scraping...' : 'Bulk Scrape'}
          </button>
        </form>
      </div>

      {loading && <LoadingSpinner />}
      {result && (
        <>
          {console.log('🖼️ Rendering BulkResults component with result:', result)}
          <BulkResults result={result} />
        </>
      )}
    </div>
  );
};

export default BulkScraper;