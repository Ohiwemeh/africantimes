// app/posts/[slug]/components/SinglePageClient.js
"use client";
import { useState } from "react";
import Menu from "@/components/Menu/Menu";
import Comments from "@/components/comments/Comments";
import { FaClock, FaUser, FaCopy, FaTwitter, FaWhatsapp, FaFacebook, FaLinkedin, FaShare } from "react-icons/fa6";

const SinglePageClient = ({ data, slug }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!data) {
    return <div className="text-center mt-32">Loading...</div>;
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const blogUrl = `${baseUrl}/posts/${slug}`;

  // Simple copy function - the rich preview comes from meta tags, not clipboard
  const copyLink = async () => {
    const text = blogUrl; // Just copy the URL
    
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareToWhatsApp = () => {
    const text = `Check out: ${data.title}\n${blogUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareToTwitter = () => {
    const text = `Check out: ${data.title}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(blogUrl)}`,
      "_blank"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`,
      "_blank"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`,
      "_blank"
    );
  };

  // Native share API (works on mobile)
  const useNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: data.title,
          text: `Check out: ${data.title}`,
          url: blogUrl,
        });
      } catch (err) {
        console.log('Native sharing failed:', err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-32 px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-red-900 dark:text-white">
          {data.title}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <FaUser className="mr-2" />
            <span>{data.admin || "Admin"}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <FaClock className="mr-2" />
            <span>5 min read</span>
          </div>
          <span>•</span>
          <span>
            {new Date(data.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Featured Image */}
      {data?.img && (
        <div className="mb-12 rounded-xl flex justify-center items-center overflow-hidden">
          <img
            src={data.img}
            alt={data.title}
            className="w-3/4 h-auto max-h-96 rounded-xl object-cover"
            onError={(e) => {
              e.target.src = "/placeholder-image.jpg";
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto prose prose-lg dark:prose-invert">
        {typeof data.desc === "string" ? (
          data.desc.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-4 text-gray-800 dark:text-gray-300 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))
        ) : (
          <p>{JSON.stringify(data.desc)}</p>
        )}
      </div>

      {/* Enhanced Sharing Section */}
      <div className="max-w-2xl mx-auto mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <p className="mb-6 sm:mb-0 text-gray-800 dark:text-gray-300 text-lg font-medium">
            Share this article
          </p>
          
          <div className="flex items-center space-x-3">
            {/* Native Share (Mobile) */}
            {typeof navigator !== 'undefined' && navigator.share && (
              <button
                onClick={useNativeShare}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                aria-label="Share"
              >
                <FaShare className="text-lg" />
              </button>
            )}

            {/* Twitter */}
            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transform hover:scale-105 transition-all duration-300"
              aria-label="Share on Twitter"
            >
              <FaTwitter className="text-lg" />
            </button>

            {/* Facebook */}
            <button
              onClick={shareToFacebook}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transform hover:scale-105 transition-all duration-300"
              aria-label="Share on Facebook"
            >
              <FaFacebook className="text-lg" />
            </button>

            {/* LinkedIn */}
            <button
              onClick={shareToLinkedIn}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transform hover:scale-105 transition-all duration-300"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </button>

            {/* WhatsApp */}
            <button
              onClick={shareToWhatsApp}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105 transition-all duration-300"
              aria-label="Share on WhatsApp"
            >
              <FaWhatsapp className="text-lg" />
            </button>

            {/* Copy Link */}
            <button
              onClick={copyLink}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transform hover:scale-105 transition-all duration-300 relative"
              aria-label="Copy link"
            >
              <FaCopy className="text-lg" />
              {isCopied && (
                <span className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-800 dark:bg-gray-600 text-white text-xs rounded-md whitespace-nowrap">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="max-w-2xl mx-auto mt-12">
        <Comments postSlug={slug} />
      </div>

      {/* Menu */}
      <Menu />
    </div>
  );
};

export default SinglePageClient;