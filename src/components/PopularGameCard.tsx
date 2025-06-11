type PopularGameCardProps = {
  name: string;
  image: string;
  onClick: () => void;
};

const PopularGameCard = ({ name, image, onClick }: PopularGameCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-48 w-full rounded-xl overflow-hidden cursor-pointer group border border-gray-600/30 hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105"
        onClick={onClick}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
          style={{
            backgroundImage: `url('${image}')`,
          }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-cyan-500/20 to-transparent" />
      </div>
      <h3 className="text-white font-bold text-sm mt-2 group-hover:text-cyan-300 transition-colors duration-300">
        {name}
      </h3>
    </div>
  );
};

export default PopularGameCard;
