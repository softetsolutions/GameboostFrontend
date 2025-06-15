type PopularGameCardProps = {
  image: string;
  onClick: () => void;
};

const PopularGameCard = ({ image, onClick }: PopularGameCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer relative transform-gpu"
    >
      <div className="relative h-[220px] w-[160px] rounded-lg overflow-hidden border border-gray-600/30 hover:border-cyan-500/60 transition-all duration-300 transform-gpu hover:scale-110 hover:z-10 shadow-lg hover:shadow-cyan-500/20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110 brightness-110"
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 group-hover:opacity-50 transition-opacity duration-300" />

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default PopularGameCard;
