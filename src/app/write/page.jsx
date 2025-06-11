"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { CiCirclePlus } from "react-icons/ci";
import { FaImage } from "react-icons/fa";

// Import the new markdown editor - this is much more deployment-friendly
import MDEditor from '@uiw/react-md-editor';
// Import the CSS - this is a single, reliable import that works well with build tools
import '@uiw/react-md-editor/markdown-editor.css';

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  // This now stores markdown content instead of HTML - much cleaner for storage
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

 useEffect(() => {
  const upload = async () => {
    setUploading(true);
    
    // Prevent duplicate uploads of the same file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "africantimes");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dufw6bsko/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMedia(data.secure_url);
      
      if (data.secure_url) {
        const imageMarkdown = `\n![Uploaded Image](${data.secure_url})\n`;
        setValue(prevValue => (prevValue || "") + imageMarkdown);
      }
    } catch (err) {
      console.error("Cloudinary upload failed:", err);
    } finally {
      setUploading(false);
      // Clear the file after upload to prevent re-uploads
      setFile(null);
    }
  };

  if (file) upload();
}, [file]);
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-lg text-gray-600 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        desc: value, // This is now markdown content - your backend can convert to HTML when needed
        img: media,
        slug: slugify(title),
        catSlug: catSlug || "style",
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
  };

  return (
    // Main container: We use max-width to prevent the editor from becoming too wide on large screens
    // The mx-auto centers the content, and px-4 provides consistent horizontal padding
    <div className="max-w-4xl mx-auto px-4 py-8 bg-white min-h-screen">
      
      {/* Title input: We make this prominent since it's the first thing users interact with */}
      {/* The focus styles create a nice visual feedback when users click into the field */}
      <input
        type="text"
        placeholder="Enter your story title..."
        className="w-full text-2xl font-bold border-none outline-none bg-transparent 
                   placeholder-gray-400 text-gray-800 mb-6 py-3
                   focus:placeholder-gray-300 transition-colors duration-200"
        onChange={(e) => setTitle(e.target.value)}
      />
      
      {/* Category selector: Styled to look modern but not too prominent */}
      {/* The rounded corners and subtle border create a professional appearance */}
      <select 
        className="mb-6 px-4 py-2 border border-gray-300 rounded-lg bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   text-gray-700 cursor-pointer transition-all duration-200"
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="">Select a category</option>
        <option value="style">Style</option>
        <option value="fashion">Fashion</option>
        <option value="food">Food</option>
        <option value="culture">Culture</option>
        <option value="travel">Travel</option>
        <option value="coding">Coding</option>
      </select>
      
      {/* Editor section: This is the main content area, so we give it plenty of space */}
      <div className="relative mb-8">
        
        {/* Media upload button: Positioned to be easily accessible but not intrusive */}
        {/* The circular design and shadow make it feel like a floating action button */}
        <button 
          className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 
                     rounded-full shadow-lg transition-colors duration-200 mb-4
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => setOpen(!open)}
        >
          {/* <Image src="/plus.png" alt="Add media" width={16} height={16} /> */}
          <CiCirclePlus className="w-20 h-20 text-white" />
        </button>
        
        {/* Media options: These appear when the plus button is clicked */}
        {/* We use smooth transitions to create a polished user experience */}
        {open && (
          <div className="flex gap-3 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200
                         transition-all duration-300 ease-in-out">
            <input
              type="file"
              id="image"
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                setPreview(URL.createObjectURL(selectedFile));
              }}
              style={{ display: "none" }}
              
            />
            
            {/* Image upload button: Clear visual hierarchy with hover effects */}
            <button >
              <label htmlFor="image" className="cursor-pointer flex items-center justify-center w-full h-full">
                <FaImage className="w-6 h-6"/>
              </label>
            </button>
            
          
          </div>
        )}
        
        {/* Image preview: Shows the uploaded image before it's processed */}
        {/* We include loading states to keep users informed about the upload progress */}
        {preview && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="relative inline-block">
              <Image 
                src={preview} 
                alt="Preview" 
                width={200} 
                height={120} 
                className="rounded-lg shadow-md"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg 
                               flex items-center justify-center">
                  <div className="text-white text-sm font-medium flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Uploading...
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* The markdown editor: This is where the magic happens */}
        {/* We style it to integrate seamlessly with the rest of the interface */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <MDEditor
            value={value}
            onChange={setValue}
            preview="edit" // This shows the editor by default, but users can toggle to preview
            hideToolbar={false} // Keep the toolbar for formatting options
            visibleDragBar={false} // Cleaner interface
            textareaProps={{
              placeholder: 'Tell your story... (You can use Markdown formatting)',
              style: {
                fontSize: 16,
                lineHeight: 1.6,
                fontFamily: 'inherit',
                border: 'none',
                outline: 'none',
                resize: 'none',
              },
            }}
            height={400} // Set a comfortable height for writing
            data-color-mode="light" // Ensures consistent theming
          />
        </div>
      </div>
      
      {/* Publish button: This is the primary call-to-action, so we make it prominent */}
      {/* The disabled state provides feedback when the form isn't ready to submit */}
      <button 
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                   text-white font-semibold py-3 px-6 rounded-lg 
                   transition-colors duration-200 shadow-md hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                   disabled:cursor-not-allowed"
        onClick={handleSubmit}
        disabled={!title.trim() || !value.trim()}
      >
        {uploading ? 'Processing...' : 'Publish Story'}
      </button>
    </div>
  );
};

export default WritePage;