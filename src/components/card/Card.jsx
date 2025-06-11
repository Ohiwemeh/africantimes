

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ item }) => {
  return (
    <Link href={`/posts/${item.slug || item.id}`} className="block group">
    <article 
      className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 
                 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden
                 hover:border-gray-300/80 hover:-translate-y-1"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="relative h-64 lg:h-full overflow-hidden">
            {item.img ? (
              <Image
                src={item.img}
                alt={item.title || 'Blog post image'}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Category Badge on Image */}
            {item.catSlug && (
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                                 bg-white/90 backdrop-blur-sm text-gray-800 border border-white/20">
                  {item.catSlug}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-8 lg:p-10">
          <div className="flex flex-col h-full">
            {/* Date and Time */}
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {item.createdAt ? (
                <time dateTime={item.createdAt}>
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} • {new Date(item.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </time>
              ) : (
                <span>Date not available</span>
              )}
            </div>

            {/* Title */}
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 line-clamp-2 
                         group-hover:text-blue-600 transition-colors duration-300">
              {item.title || 'Untitled Post'}
            </h2>

            {/* Author and Read More */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center">
                {item.user?.image ? (
                  <Image
                    src={item.user.image}
                    alt={item.user.name || 'Author'}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-white shadow-sm"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 
                                rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">
                      {item.user?.name?.charAt(0) || 'A'}
                    </span>
                  </div>
                )}
                <div className="ml-3">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.user?.name || 'Anonymous'}
                  </p>
                  <p className="text-xs text-gray-500">Author</p>
                </div>
              </div>

              {/* Read More Button */}
              <button className="inline-flex items-center px-4 py-2 text-sm font-semibold 
                               text-blue-600 hover:text-blue-700 transition-colors duration-200
                               group-hover:translate-x-1 transform transition-transform">
                Read More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
    </Link>
  );
};

export default Card;
