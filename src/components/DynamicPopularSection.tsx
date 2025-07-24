import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PopularGameCard from "./PopularGameCard";
import toast from "react-hot-toast";

type Product = {
  _id: string;
  title: string;
  images: string[];
  offerCount: number;
  service?: string;
};

type DynamicPopularSectionProps = {
  title: string;
  products: Product[];
};

const CARDS_PER_VIEW = 4;

const DynamicPopularSection = ({ title, products }: DynamicPopularSectionProps) => {
  const navigate = useNavigate();
  const [startIdx, setStartIdx] = useState(0);
  const maxIdx = Math.max(0, products.length - CARDS_PER_VIEW);
  
  // Drag functionality
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = async (product: Product) => {
    if (isDragging) return;
    
    try {
      if (!product.service) {
        throw new Error("Service ID not found for product");
      }
      navigate(`/product?productId=${product._id}&serviceId=${product.service}`, { state: { serviceName: title } });
      
    } catch (error) {
      console.error("Error navigating to product page:", error);
      toast.error("Failed to load product offers");
    }
  };

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(0, prev - CARDS_PER_VIEW));
  };
  const handleNext = () => {
    setStartIdx((prev) => Math.min(maxIdx, prev + CARDS_PER_VIEW));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    if (containerRef.current) {
      const x = e.pageX - (containerRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const visibleProducts = products.slice(startIdx, startIdx + CARDS_PER_VIEW);

  return (
    <div className="mb-12 relative max-w-4xl mx-auto">
      <div className="mb-6 px-4">
        <h2 className="text-3xl font-bold text-white">{`Popular ${title}`}</h2>
      </div>
      
      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 -left-3 flex items-center">
        {startIdx > 0 && (
          <button
            onClick={handlePrev}
            className="group transform transition-all duration-300 hover:scale-110"
            aria-label="Show previous cards"
          >
            <div className="bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
              <svg className="w-5 h-5 text-white group-hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
        )}
      </div>

      <div className="absolute inset-y-0 -right-3 flex items-center">
        {startIdx < maxIdx && (
          <button
            onClick={handleNext}
            className="group transform transition-all duration-300 hover:scale-110"
            aria-label="Show next cards"
          >
            <div className="bg-gray-900/80 hover:bg-gray-800 p-3 rounded-full shadow-lg backdrop-blur-sm border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
              <svg className="w-5 h-5 text-white group-hover:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Cards Container */}
      <div 
        ref={containerRef}
        className="flex overflow-x-hidden cursor-grab py-6 px-8 select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
      >
        <div className="flex gap-6 w-full justify-center">
          {visibleProducts.map((product) => (
            <div key={product._id} className="flex-shrink-0 w-[160px]">
              <PopularGameCard
                image={product.images?.[0] || ""}
                title={product.title}
                offerCount={product.offerCount}
                onClick={() => handleCardClick(product)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicPopularSection; 