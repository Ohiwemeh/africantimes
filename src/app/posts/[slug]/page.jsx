// app/posts/[slug]/page.js
import SinglePageClient from '@/components/SinglePageClient';
import { Metadata } from 'next';

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch post data");
  return res.json();
};

// This generates the meta tags that social media platforms read
export async function generateMetadata({ params }) {
  const { slug } = params;
  
  try {
    const data = await getData(slug);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
    return {
      title: data.title,
      description: data.desc ? data.desc.substring(0, 160) + '...' : 'Read this amazing blog post',
      
      // Open Graph tags (Facebook, WhatsApp, LinkedIn)
      openGraph: {
        title: data.title,
        description: data.desc ? data.desc.substring(0, 160) + '...' : 'Read this amazing blog post',
        url: `${baseUrl}/posts/${slug}`,
        siteName: 'Your Blog Name', // Change this to your blog name
        images: [
          {
            url: data.img,
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: data.createdAt,
      },
      
      // Twitter Card tags
      twitter: {
        card: 'summary_large_image',
        title: data.title,
        description: data.desc ? data.desc.substring(0, 160) + '...' : 'Read this amazing blog post',
        images: [data.img],
      },
      
      // Additional meta tags
      alternates: {
        canonical: `${baseUrl}/posts/${slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Read this amazing blog post',
    };
  }
}

const SinglePage = async ({ params }) => {
  const { slug } = params;
  
  try {
    const data = await getData(slug);
    return <SinglePageClient data={data} slug={slug} />;
  } catch (error) {
    console.error('Error fetching post:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Post</h1>
          <p className="text-gray-600">The blog post could not be loaded.</p>
        </div>
      </div>
    );
  }
};

export default SinglePage;