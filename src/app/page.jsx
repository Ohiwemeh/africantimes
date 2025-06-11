import Link from "next/link";

import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

export default async function Home({ searchParams }) {
  const searchedParams = await searchParams;
  const page = searchedParams.page || 1;

  if (isNaN(page) || page < 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center max-w-md w-full border border-red-100">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Invalid Page Number
            </h1>
            <p className="text-gray-600 text-sm">
              The page you're looking for doesn't exist or the page number is invalid.
            </p>
          </div>
          
          <Link 
            href="/" 
            className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-blue-700 
                       hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg 
                       transition-all duration-200 transform hover:scale-105 focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero/Featured Section */}
      

      {/* Categories Section */}
      <section className="py-8 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <CategoryList />
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
            
            {/* Main Content - Takes up more space on larger screens */}
            <div className="lg:col-span-10 xl:col-span-12">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <CardList page={parseInt(page)} />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Optional: Decorative bottom gradient */}
      <div className="h-24 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
}