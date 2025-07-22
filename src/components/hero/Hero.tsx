import { useState, useEffect } from "react";
import BoostingIcon from "../../assets/svgIcons/boostingArrow.svg?react";
import UserIcon from "../../assets/svgIcons/userIcon.svg?react";
import CurrencyIcon from "../../assets/svgIcons/currencyIcon.svg?react";
import CoachIcon from "../../assets/svgIcons/coachIcon.svg?react";
import TournamentIcon from "../../assets/svgIcons/tournamentIcon.svg?react";
import ServiceCard from "../ServiceCard";
// import SearchIcon from "../../assets/svgIcons/SearchIcon.svg?react";
import ArrowLeft from "../../assets/svgIcons/ArrowLeft.svg?react";
import ArrowRight from "../../assets/svgIcons/ArrowRight.svg?react";
// import { fetchHomePageData } from "../../api/products";
// import type { HomePageService } from "../../api/products";
// import DynamicPopularSection from "../DynamicPopularSection";
import SearchBar from "../SearchBar";
import BrowsingHistory from "../BrowsingHistory";
import TrendingServices from "../TrendingServices";

const HeroSection = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [popularSections, setPopularSections] = useState<HomePageService[]>([]);

  // Services
  const serviceCards = [
    {
      title: "BOOSTING",
      description:
        "Get professional help to reach your goals and climb the ranks faster.",
      icon: <BoostingIcon className="w-8 h-8 text-white" />,
    },
    {
      title: "ACCOUNTS",
      description: "Buy and sell game accounts securely with verified sellers.",
      icon: <UserIcon className="w-8 h-8 text-white" />,
    },
    {
      title: "CURRENCY",
      description:
        "Purchase in-game currency hassle-free with instant delivery.",
      icon: <CurrencyIcon className="w-8 h-8 text-white" />,
    },
    {
      title: "COACHING",
      description:
        "Learn from pro players and improve your skills with personalized coaching.",
      icon: <CoachIcon className="w-8 h-8 text-white" />,
    },
    {
      title: "TOURNAMENTS",
      description:
        "Join competitive tournaments and win exclusive prizes and rewards.",
      icon: <TournamentIcon className="w-8 h-8 text-white" />,
    },
  ];

  // useEffect(() => {
  //   fetchHomePageData()
  //     .then((services: HomePageService[]) => {
  //       setPopularSections(services);
  //     })
  //     .catch(() => setPopularSections([]));
  // }, []);

  // const handleSearch = () => {
  // };
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlides = Math.ceil(serviceCards.length / 3) - 1;
      return prev >= maxSlides * 3 ? 0 : prev + 3;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlides = Math.ceil(serviceCards.length / 3) - 1;
      return prev <= 0 ? maxSlides * 3 : prev - 3;
    });
  };

  // Calculate visible cards 
  const visibleCards = serviceCards.slice(currentSlide, currentSlide + 3);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Gaming Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900"></div>

        {/* Gaming Image */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            }}
          ></div>
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-900/90"></div>
        </div>
      </div>

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              GAME BOOSTING
            </span>
            <br />
            <span className="text-white">SERVICES</span>
          </h1>

          {/* Search */}
          <SearchBar/>

          {/* Service Cards */}
          <div className="relative max-w-7xl mx-auto mb-24 py-4">
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 shadow-xl backdrop-blur-sm border border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              aria-label="Previous services"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 shadow-xl backdrop-blur-sm border border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              aria-label="Next services"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Cards Container */}
            <div className="overflow-visible mx-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                {visibleCards.map((card, index) => (
                  <ServiceCard
                    key={`${currentSlide}-${index}`}
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                  />
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-3 hover:cursor-pointer">
              {Array.from({ length: Math.ceil(serviceCards.length / 3) }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index * 3)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index * 3
                        ? "bg-gradient-to-r from-cyan-500 to-blue-700 w-8"
                        : "bg-gray-500 w-2 hover:bg-gray-400"
                    }`}
                  />
                )
              )}
            </div>
          </div>

          <BrowsingHistory/>

          {/* Dynamic Popular Sections */}
          {/* <div className="mt-20">
            {popularSections.map(section => (
              <DynamicPopularSection
                key={section._id}
                title={section.name}
                products={section.products.map(product => ({ ...product, service: section._id }))}
              />
            ))}
          </div> */}
          <TrendingServices/>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
