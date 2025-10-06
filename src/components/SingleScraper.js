import React, { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import SingleResult from './SingleResult';

const SingleScraper = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🚀 Starting single article scrape for:', url);
    setLoading(true);
    setResult(null);

    try {
      console.log('📡 Making API call to:', 'http://localhost:8401/api/scraper/url');
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8401'}/api/scraper/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
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
        url,
        data: { title: '', paragraphs: [], images: [] },
        error: 'Failed to scrape article'
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Scrape Single Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Article URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/article"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            <i className="fas fa-search mr-2"></i>
            {loading ? 'Scraping...' : 'Scrape Article'}
          </button>
        </form>
      </div>

      {loading && <LoadingSpinner />}
      {result && (
        <>
          {console.log('🖼️ Rendering SingleResult component with result:', result)}
          <SingleResult result={result} />
        </>
      )}
    </div>
  );
};

export default SingleScraper;