export default function ProductDetailLoading() {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="w-full h-[300px] bg-gray-200 rounded-lg mb-6" />
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-4" />
        <div className="h-6 bg-gray-100 rounded w-1/3 mb-6" />
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-gray-200 rounded-full" />
          <div className="w-20 h-6 bg-gray-200 rounded-full" />
          <div className="w-14 h-6 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }