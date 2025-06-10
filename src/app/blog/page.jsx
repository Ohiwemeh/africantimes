import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

const BlogPage = async ({ searchParams }) => {
  const cat = searchParams?.cat || "all";
  const page = searchParams?.page || "1";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 capitalize">
            {cat} Blog
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Blog Posts Section */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 lg:p-8">
              <CardList page={parseInt(page)} cat={cat} />
            </div>
          </div>

          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-6 transform hover:scale-105 transition-all duration-300">
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;