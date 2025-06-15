import { useState, useRef } from "react";
import BoostingIcon from "../../assets/svgIcons/boostingArrow.svg?react";
import UserIcon from "../../assets/svgIcons/userIcon.svg?react";
import CurrencyIcon from "../../assets/svgIcons/currencyIcon.svg?react";
import CoachIcon from "../../assets/svgIcons/coachIcon.svg?react";
import TournamentIcon from "../../assets/svgIcons/tournamentIcon.svg?react";
import ServiceCard from "../ServiceCard";
import PopularGameCard from "../PopularGameCard"
import SearchIcon from "../../assets/svgIcons/SearchIcon.svg?react";
import ArrowLeft from "../../assets/svgIcons/ArrowLeft.svg?react";
import ArrowRight from "../../assets/svgIcons/ArrowRight.svg?react";
import fortniteImg from "../../assets/images/fortnite.jpg";
import valorantImg from "../../assets/images/valorant.png";
import gtaImg from "../../assets/images/gta.jpg";
import cocImg from "../../assets/images/coc.jpg";
import codImg from "../../assets/images/cod.jpg";
import apexImg  from "../../assets/images/apex.jpg";
import bgmiImg from "../../assets/images/bgmi.jpeg";
import forzaImg from "../../assets/images/forzahorizon.jpg";
import freefireImg from "../../assets/images/freefire.avif";
import minecraftImg from "../../assets/images/minecraft.jpg";
import pokemonImg from "../../assets/images/pokemon.jpg";
import rocketImg from "../../assets/images/rocket.jpg";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const gamesContainerRef = useRef<HTMLDivElement>(null);

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
  const popularGames = [
    {
      name: "Fortnite",
      image: fortniteImg,
    },
    {
      name: "Valorant",
      image: valorantImg,
    },
    {
      name: "Grand Theft Auto",
      image: gtaImg,
    },
    {
      name: "Clash of Clans",
      image: cocImg,
    },
    {
      name: "Call of Duty",
      image: codImg,
    },
    {
      name:"Apex Legends",
      image: apexImg,
    },
    {
      name:"BGMI",
      image: bgmiImg,
    },{
      name:"Forza Horizon",
      image: forzaImg,
    },
    {
      name:"Free Fire",
      image: freefireImg,
    },
    {
      name:"Minecraft",
      image: minecraftImg,
    },
    {
      name:"Pokemon Go",
      image: pokemonImg,
    },
    {
      name:"Rocket League",
      image: rocketImg,
    },
  ]
  const handleSearch = () => {
  };
  const handleGameClick = (gameName: string) => {
    console.log("Selected game:", gameName)
  }
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

  const scrollGames = (direction: 'left' | 'right') => {
    if (gamesContainerRef.current) {
      const scrollAmount = 400;
      const container = gamesContainerRef.current;
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

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
          <div className="max-w-2xl mx-auto mb-16">
            <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-2">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search games, services, accounts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-white placeholder-gray-300 pl-12 pr-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Search
              </button>
            </div>
          </div>

          {/* Service Cards */}
          <div className="relative max-w-7xl mx-auto mb-24 py-4">
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 shadow-xl backdrop-blur-sm border border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              aria-label="Previous services"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 shadow-xl backdrop-blur-sm border border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:cursor-pointer"
              aria-label="Next services"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Cards Container */}
            <div className="overflow-visible mx-16 py-8">
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

          {/* Popular Games  */}
          <div className="mt-20 relative">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Popular Games</h2>
            
            {/* Scroll Buttons */}
            <button
              onClick={() => scrollGames('left')}
              className="absolute -left-4 top-[60%] -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-3 transition-all duration-300 hover:cursor-pointer" 
              aria-label="Scroll games left"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollGames('right')}
              className="absolute -right-4 top-[60%] -translate-y-1/2 z-20 bg-gray-900/80 hover:bg-gray-900 text-white rounded-full p-3 transition-all duration-300 hover:cursor-pointer"
              aria-label="Scroll games right"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Games Container */}
            <div className="relative mx-8">
              <div 
                ref={gamesContainerRef}
                className="flex overflow-x-auto gap-4 py-4 px-2 scrollbar-hide scroll-smooth"
                style={{ 
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {popularGames.map((game, index) => (
                  <div className="transform-gpu" style={{ padding: '10px' }}>
                    <PopularGameCard
                      key={index}
                      image={game.image}
                      onClick={() => handleGameClick(game.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
