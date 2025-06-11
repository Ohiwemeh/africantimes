import React from "react";
import Link from "next/link";
import Image from "next/image";
import MenuCategories from "../menuCategories/MenuCategories";

const getData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories", {
      cache: "no-store",
    });

    if (!res.ok) {
      return []; // Return empty array if fetch fails
    }

    const json = await res.json();
    return Array.isArray(json) ? json : json.data;
  } catch (error) {
    return []; // Return empty array on error
  }
};

const getRandomImage = () =>
  `https://source.unsplash.com/random/32x32?sig=${Math.floor(Math.random() * 1000)}`;

const CategoryList = async () => {
  const data = await getData();
  
  return (
    <div className="py-12 bg-gradient-to-r from-indigo-50 via-white to-purple-50">
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
          Discover by topic
        </h2>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Categories
        </h1>
        <MenuCategories />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Popular Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover content across our most engaging topics and find exactly what interests you
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto"></div>
        </div>

        {/* Categories Grid */}
        {data?.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 lg:gap-6">
            {data.map((item, index) => (
              <Link 
                href={`/blog?cat=${item.slug || 'style'}`} 
                key={item._id}
                className="group relative"
              >
                <div className="flex flex-col items-center p-4 sm:p-6 bg-white rounded-2xl shadow-md hover:shadow-xl 
                               transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 
                               border border-gray-100 hover:border-indigo-200 min-h-[120px] sm:min-h-[140px]">
                  
                  {/* Image Container with Gradient Border */}
                  <div className="relative mb-3 sm:mb-4">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden ring-2 ring-white shadow-lg">
                      <Image
                        src={getRandomImage()}
                        alt={`${item.title} category`}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 text-center leading-tight
                                 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Hover Effect Indicator */}
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 
                                  rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Enhanced Empty State
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              {/* Empty State Icon */}
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Categories Available
              </h3>
              <p className="text-gray-500 mb-6">
                Categories are currently being updated. Please check back soon for exciting content topics.
              </p>
              
              {/* Optional CTA Button */}
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                               text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 
                               transition-all duration-200 transform hover:scale-105 focus:outline-none 
                               focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Categories
              </button>
            </div>
          </div>
        )}

        {/* Optional: Show total count */}
        {data?.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
              Explore <span className="font-semibold text-indigo-600">{data.length}</span> categories
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;