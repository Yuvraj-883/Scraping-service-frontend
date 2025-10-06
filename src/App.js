import React, { useState } from 'react';
import SingleScraper from './components/SingleScraper';
import BulkScraper from './components/BulkScraper';

function App() {
  const [activeTab, setActiveTab] = useState('single');

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            <i className="fas fa-newspaper text-blue-600 mr-3"></i>
            News Scraper Dashboard
          </h1>
          <p className="text-gray-600">Extract and summarize articles from any news website</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('single')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'single'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-link mr-2"></i>Single Article
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                activeTab === 'bulk'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className="fas fa-list mr-2"></i>Bulk Scrape
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'single' ? <SingleScraper /> : <BulkScraper />}
        </div>
      </div>
    </div>
  );
}

export default App;