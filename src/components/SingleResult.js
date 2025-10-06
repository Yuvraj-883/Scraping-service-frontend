import React from 'react';

const SingleResult = ({ result }) => {
  console.log('🎯 SingleResult received result:', result);
  
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

  const articleData = result.data?.data || result.data;
  const summaryData = result.data?.summary?.data;
  
  console.log('✅ Rendering successful result for:', articleData?.title);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Results</h3>
      
      <div className="border-l-4 border-blue-500 pl-4 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">{summaryData?.title}</h4>
        <p className="text-sm text-gray-600 mb-2">Source: {result.data?.url || result.url}</p>
      </div>
      
      {summaryData && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h5 className="font-semibold text-blue-800 mb-2">
            <i className="fas fa-robot mr-2"></i>AI Summary
          </h5>
          <p className="text-blue-700">
            {summaryData.summary || summaryData.title || JSON.stringify(summaryData)}
          </p>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-semibold text-gray-800 mb-3">
            <i className="fas fa-align-left mr-2"></i>Content
          </h5>
          <div className="max-h-64 overflow-y-auto bg-gray-50 p-3 rounded">
            {articleData?.paragraphs?.map((paragraph, index) => (
              <p key={index} className="mb-2 text-sm">{paragraph}</p>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="font-semibold text-gray-800 mb-3">
            <i className="fas fa-images mr-2"></i>Images ({articleData?.images?.length || 0})
          </h5>
          <div className="max-h-64 overflow-y-auto">
            {articleData?.images?.slice(0, 3).map((image, index) => (
              <div key={index} className="mb-2 p-2 bg-gray-50 rounded text-xs">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-20 object-cover rounded mb-1"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <p className="text-gray-600">{image.alt || 'No alt text'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleResult;