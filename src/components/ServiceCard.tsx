interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => (
  <div className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-600/30 hover:border-cyan-500/60 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-cyan-500/20">
    {/* Gradient overlay on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative z-10">
      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-300 mb-8 leading-relaxed text-sm">
        {description}
      </p>
      <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 hover:cursor-pointer">
        View more
      </button>
    </div>
  </div>
);

export default ServiceCard; 