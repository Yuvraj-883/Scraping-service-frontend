import React from 'react';

const BulkResults = ({ result }) => {
  console.log('🎯 BulkResults received result:', result);
  
  if (!result.statusCode || result.statusCode !== 200) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <i className="fas fa-exclamation-triangle text-red-500 mr-2"></i>
          <span className="text-red-700">{result.error}</span>
        </div>
      </div>
    );
  }

  const bulkData = result.data || result;
  const articles = bulkData.articles || [];
  
  console.log('✅ Rendering successful bulk results with', articles.length, 'articles');
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Results</h3>
      
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold text-green-800">
          <i className="fas fa-check-circle mr-2"></i>
          Scraped {bulkData.scraped || articles.length} of {bulkData.totalFound || articles.length} articles found
        </h4>
        <p className="text-sm text-green-700 mt-1">Source: {bulkData.sourceUrl || 'N/A'}</p>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {articles.map((article, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-medium text-gray-800 flex-1">{article.summary.data.title}</h5>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">#{index + 1}</span>
            </div>
            
            {article.summary?.data?.summary && (
              <div className="bg-blue-50 p-3 rounded mb-3">
                <p className="text-sm text-blue-700">
                  <i className="fas fa-robot mr-1"></i> {article.summary.data.summary}
                </p>
              </div>
            )}
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                <i className="fas fa-paragraph mr-1"></i>
                {article.paragraphs?.length || 0} paragraphs
              </span>
              <span>
                <i className="fas fa-images mr-1"></i>
                {article.images?.length || 0} images
              </span>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                <i className="fas fa-external-link-alt mr-1"></i>View Original
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulkResults;