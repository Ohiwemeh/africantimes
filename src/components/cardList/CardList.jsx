import React from "react";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";

const getData = async (page, cat) => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return { posts: [], count: 0 }; // Return empty data if fetch fails
    }

    return await res.json();
  } catch (error) {
    return { posts: [], count: 0 }; // Return empty data on error
  }
};

const CardList = async ({ page, cat }) => {
  const { posts, count } = await getData(page, cat);

  const POST_PER_PAGE = 2;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  console.log("Posts:", posts);

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="px-6 py-8 border-b border-gray-100 bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
            Recent Posts
          </h1>
          
          {/* Post Count Badge */}
          {count > 0 && (
            <div className="hidden sm:flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {count} {count === 1 ? 'post' : 'posts'}
              </span>
            </div>
          )}
        </div>
        
        {/* Category Filter Indicator */}
        {cat && (
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Filtered by: <span className="ml-1 font-medium text-blue-600 capitalize">{cat}</span>
          </div>
        )}
        
        <p className="text-gray-600 mt-2">
          Discover our latest articles, insights, and stories
        </p>
      </div>

      {/* Posts Content */}
      <div className="px-6 py-8">
        {posts?.length > 0 ? (
          <div className="space-y-6">
            {/* Posts Grid/List */}
            <div className="space-y-8">
              {posts.map((item, index) => (
                <div 
                  key={item.id}
                  className="group relative transition-all duration-300 hover:transform hover:-translate-y-1"
                >
                  {/* Card wrapper with enhanced styling */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg 
                                  hover:border-gray-300 transition-all duration-300 overflow-hidden">
                    <Card item={item} />
                  </div>
                  
                  {/* Optional: Add a subtle divider between posts except for the last one */}
                  {index < posts.length - 1 && (
                    <div className="mt-8 flex justify-center">
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Posts Stats */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                Showing {POST_PER_PAGE * (page - 1) + 1} - {Math.min(POST_PER_PAGE * page, count)} of {count} posts
              </div>
              
              {/* Optional: Reading time estimate */}
              <div className="hidden md:flex items-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ~{posts.length * 3} min read
              </div>
            </div>
          </div>
        ) : (
          // Enhanced Empty State
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              {/* Empty State Illustration */}
              <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                {cat ? `No posts found in "${cat}"` : 'No posts available'}
              </h3>
              
              <p className="text-gray-500 mb-8 leading-relaxed">
                {cat 
                  ? `We couldn't find any posts in the ${cat} category. Try exploring other categories or check back later.`
                  : 'No posts have been published yet. Check back soon for exciting new content!'
                }
              </p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {cat && (
                  <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 
                                   text-gray-700 font-medium rounded-lg hover:bg-gray-50 hover:border-gray-400
                                   transition-all duration-200 focus:outline-none focus:ring-2 
                                   focus:ring-blue-500 focus:ring-offset-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Clear Filter
                  </button>
                )}
                
                <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                                 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 
                                 transition-all duration-200 transform hover:scale-105 focus:outline-none 
                                 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Posts
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination Section */}
      {posts?.length > 0 && (
        <div className="px-6 py-6 border-t border-gray-100 bg-gray-50/50">
          <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
        </div>
      )}
    </div>
  );
};

export default CardList;