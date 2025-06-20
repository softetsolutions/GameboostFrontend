import { useState } from 'react';

// interfaces for the data
interface Rating {
  positive: string;
  negative: string;
}

interface SellerRanking {
  current: string;
  next: string;
  salesNeeded: number;
  salesDueDate: string;
}

interface BuyerRanking {
  current: string;
  next: string;
  spendNeeded: number;
}

interface UserData {
  banner: string;
  imageURL: string;
  username: string;
  level: number;
  usdToNextLevel: number;
  memberSince: string;
  successfulDelivery: string;
  totalLifetimeOrders: number;
  last90DaysRating: Rating;
  allTimeRating: Rating;
  description: string;
  languages: string[];
  sellerRanking: SellerRanking;
  buyerRanking: BuyerRanking;
  video: string | null;
}

const ProfilePage = () => {
  const initialUserData: UserData = {
    banner: "https://images.pexels.com/photos/1293260/pexels-photo-1293260.jpeg",
    imageURL: "https://images.pexels.com/photos/3829227/pexels-photo-3829227.jpeg",
    username: 'ballpoolshop',
    level: 79,
    usdToNextLevel: 236.79,
    memberSince: 'May, 2023',
    successfulDelivery: '0%',
    totalLifetimeOrders: 0,
    last90DaysRating: {
      positive: '100%',
      negative: '0%',
    },
    allTimeRating: {
      positive: '100%',
      negative: '70%',
    },
    description: 'No profile description.',
    languages: ['English'],
    sellerRanking: {
      current: 'Normal Seller',
      next: 'Common Seller',
      salesNeeded: 300,
      salesDueDate: '30 Jun',
    },
    buyerRanking: {
      current: 'Gold',
      next: 'Platinum',
      spendNeeded: 5241.79,
    },
    video: null,
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);
  const [newDescription, setNewDescription] = useState<string>(userData.description);
  const [isAddingLanguage, setIsAddingLanguage] = useState<boolean>(false);
  const [newLanguage, setNewLanguage] = useState<string>('');
  const [videoError, setVideoError] = useState<string>('');
  const [showRightColumnContent, setShowRightColumnContent] = useState<boolean>(false);

  // edit description
  const handleEditDescription = () => {
    setIsEditingDescription(true);
    setNewDescription(userData.description);
  };

  // save description
  const handleSaveDescription = () => {
    setUserData({ ...userData, description: newDescription });
    setIsEditingDescription(false);
  };

  // cancel description edit
  const handleCancelDescription = () => {
    setIsEditingDescription(false);
    setNewDescription(userData.description);
  };

  // add language
  const handleAddLanguage = () => {
    setIsAddingLanguage(true);
  };

  // save language
  const handleSaveLanguage = () => {
    if (newLanguage.trim() !== '' && !userData.languages.includes(newLanguage.trim())) {
      setUserData({ ...userData, languages: [...userData.languages, newLanguage.trim()] });
      setNewLanguage('');
      setIsAddingLanguage(false);
    }
  };

  // cancel adding language
  const handleCancelAddLanguage = () => {
    setNewLanguage('');
    setIsAddingLanguage(false);
  };

  // Function to handle video file selection
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['video/mp4', 'video/mov'];
      if (!allowedTypes.includes(file.type)) {
        setVideoError('Unsupported file format. Only mp4 and mov are allowed.');
        setUserData({ ...userData, video: null });
        return;
      }

      const maxSize = 50 * 1024 * 1024; //(50 MB limit)
      if (file.size > maxSize) {
        setVideoError('File size exceeds 50 MB limit.');
        setUserData({ ...userData, video: null });
        return;
      }

      setVideoError('');
      setUserData({ ...userData, video: URL.createObjectURL(file) });
    } else {
      setUserData({ ...userData, video: null });
      setVideoError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-inter text-gray-200">
      {/* Background Banner */}
      <div
        className="w-full h-[150px] md:h-[200px] bg-gradient-to-r from-blue-700 to-cyan-500 bg-cover bg-center"
        style={{ backgroundImage: `url(${userData.banner})` }}
      >
      </div>

      <div className="max-w-6xl mx-auto -mt-24 md:-mt-32 relative z-10 p-4">
        <div className="bg-gray-800/50 shadow-lg rounded-xl overflow-hidden md:flex border border-gray-700/50">
          {/* Left Column: Profile Summary */}
          <div className="md:w-1/3 p-6 bg-gradient-to-b from-cyan-700 to-blue-900 text-white flex flex-col items-center rounded-xl m-4 md:m-0 md:rounded-l-xl md:rounded-r-none">
            <div className="mb-4">
              <img src={userData.imageURL} alt="Profile" className="rounded-full h-24 w-24 object-cover bg-white p-1 shadow-lg" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{userData.username}</h1>
            <div className="text-lg mb-1 flex items-center justify-center w-full px-4">
              <span>level {userData.level}</span>
              {/* Custom range slider styling */}
              <input
                type="range"
                min="0"
                max="100"
                value={userData.level}
                readOnly
                className='flex-grow mx-2 h-2 rounded-full appearance-none cursor-default
                                bg-gray-600 [&::-webkit-slider-thumb]:appearance-none
                                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400
                                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
                                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cyan-200'
              />
              <span>100</span> {/* Assuming max level is 100 for range */}
            </div>
            <div className="text-sm text-center text-gray-100 mb-6">
              Buy or sell ${userData.usdToNextLevel.toFixed(2)} USD of products to reach the next user level.
              <a href="#" className="underline ml-1 text-cyan-200 hover:text-cyan-400 transition-colors">Learn more</a>
            </div>
            <a href="#" className="w-full text-center mt-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-cyan-600 hover:to-blue-800 transition-all duration-300">
              Upgrade to business account
            </a>
            <a href="#" className="w-full text-center mt-3 px-6 py-2 border border-blue-400 text-blue-200 font-semibold rounded-lg shadow-md hover:bg-blue-800/30 transition-all duration-300">
              View my profile as a Public
            </a>

            {/* Member Since */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50 flex justify-between">
              <h3 className="text-sm font-semibold text-gray-400 mb-1">Member since</h3>
              <p className="text-sm font-medium text-gray-100">{userData.memberSince}</p>
            </div>

            {/* Successful Delivery */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50 flex justify-between">
              <h3 className="text-sm font-semibold text-gray-400 mb-1">Successful delivery</h3>
              <div>
                <p className="text-sm font-medium text-gray-100">{userData.successfulDelivery}</p>
                <p className="text-xs text-gray-400">(Total lifetime orders: {userData.totalLifetimeOrders})</p>
              </div>
            </div>

            {/* Last 90 Days Rating, All time rating */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50">
              <div className='flex justify-between'>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">Last 90 Days</h3>
                <span className="text-sm font-medium text-green-400">{userData.last90DaysRating.positive}</span>
                <span className="text-sm font-medium text-red-400">{userData.last90DaysRating.negative}</span>
              </div>

              <div className='flex justify-between'>
                <h3 className="text-sm font-semibold text-gray-400 mb-1">All time rating</h3>
                <span className="text-sm font-medium text-green-400">{userData.allTimeRating.positive}</span>
                <span className="text-sm font-medium text-red-400">{userData.allTimeRating.negative}</span>
              </div>
            </div>

            {/* Add Video Section */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 border border-gray-700/50 text-center w-full">
              <div className="border border-dashed border-gray-600 rounded-lg p-2 flex flex-col items-center justify-center h-30 relative overflow-hidden">
                {userData.video ? (
                  <video controls src={userData.video} className="max-h-full max-w-full rounded-md object-contain"></video>
                ) : (
                  <>
                    <input
                      type="file"
                      accept="video/mp4,video/mov"
                      onChange={handleVideoUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <span className="font-medium text-cyan-400">Add video</span>
                      <p className="text-xs mt-2">Supported format: mp4, mov.</p>
                      <p className="text-xs">Max.file size: 50 MB</p>
                    </div>
                  </>
                )}
              </div>
              {videoError && <p className="text-red-400 text-sm mt-2">{videoError}</p>}
              {userData.video && (
                <button
                  onClick={() => setUserData({ ...userData, video: null })}
                  className="mt-4 px-4 py-2 border border-red-500 text-red-400 font-semibold rounded-md text-sm hover:bg-red-900/20 transition-colors"
                >
                  Remove Video
                </button>
              )}
            </div>

            {/* Description Section */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-100">Description</h3>
                {!isEditingDescription && (
                  <button onClick={handleEditDescription} className="text-cyan-400 font-medium text-sm hover:underline">Edit</button>
                )}
              </div>
              {isEditingDescription ? (
                <div>
                  <textarea
                    className="w-full p-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-cyan-500"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={4}
                  ></textarea>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      onClick={handleSaveDescription}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-md text-sm hover:from-cyan-600 hover:to-blue-800 transition-all duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelDescription}
                      className="px-4 py-2 border border-gray-600 text-gray-400 rounded-md text-sm hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-300 text-sm">{userData.description || 'No profile description.'}</p>
              )}
            </div>

            {/* Languages Section */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-100">Languages</h3>
                {!isAddingLanguage && (
                  <button onClick={handleAddLanguage} className="text-cyan-400 font-medium text-sm hover:underline">+ Add</button>
                )}
              </div>
              {userData.languages.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-2">
                  {userData.languages.map((lang, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-800/30 text-blue-300 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-300 mb-2 text-sm">No language selected.</p>
              )}

              {isAddingLanguage && (
                <div>
                  <input
                    type="text"
                    className="w-full p-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-cyan-500 mb-2"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Enter new language"
                  />
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={handleSaveLanguage}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-700 text-white rounded-md text-sm hover:from-cyan-600 hover:to-blue-800 transition-all duration-300"
                    >
                      Add
                    </button>
                    <button
                      onClick={handleCancelAddLanguage}
                      className="px-4 py-2 border border-gray-600 text-gray-400 rounded-md text-sm hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Seller Ranking */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50">
              <h3 className="font-bold text-gray-100 mb-2">Seller Ranking</h3>
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-yellow-800/30 text-yellow-300 text-sm font-medium rounded-full mr-2">
                  {userData.sellerRanking.current}
                </span>
                <span className="text-gray-300 text-sm">
                  Next: <span className="font-semibold text-cyan-400">{userData.sellerRanking.next}</span>
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Based on your monthly sales on 16 Jun, get another ${userData.sellerRanking.salesNeeded.toFixed(2)} USD sales by {userData.sellerRanking.salesDueDate} to reach {userData.sellerRanking.next}.
                <a href="#" className="underline ml-1 text-cyan-400 hover:text-cyan-200 transition-colors">Learn more</a>
              </p>
            </div>

            {/* Buyer Ranking */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50">
              <h3 className="font-bold text-gray-100 mb-2">Buyer Ranking</h3>
              <div className="flex items-center mb-2">
                <span className="px-3 py-1 bg-purple-800/30 text-purple-300 text-sm font-medium rounded-full mr-2">
                  {userData.buyerRanking.current}
                </span>
                <span className="text-gray-300 text-sm">
                  Next: <span className="font-semibold text-cyan-400">{userData.buyerRanking.next}</span>
                </span>
              </div>
              <p className="text-sm text-gray-300">
                Spend ${userData.buyerRanking.spendNeeded.toFixed(2)} USD more to reach {userData.buyerRanking.next}.
                <a href="#" className="underline ml-1 text-cyan-400 hover:text-cyan-200 transition-colors">Learn more</a>
              </p>
            </div>

            {/* Seller Protection */}
            <div className="bg-gray-700/30 p-2 rounded-lg shadow-sm mt-4 w-full border border-gray-700/50">
              <h3 className="font-bold text-gray-100 mb-2">Seller Protection</h3>
              <a className="text-sm text-gray-300 hover:underline hover:text-cyan-400" href="#">
                View upcoming month eligibility for protection
              </a>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:w-2/3 p-6 flex flex-col gap-6">
            {!showRightColumnContent ? (
              <div className="flex justify-center items-center h-full"> {/* Center the button */}
                <button
                  onClick={() => setShowRightColumnContent(true)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-700 text-white font-bold rounded-lg shadow-md hover:from-blue-600 hover:to-cyan-800 transition-all duration-300 text-lg"
                >
                  Create Offer
                </button>
              </div>
            ) : (
              <>
                {/* Featured Offers Section */}
                <div className="bg-gray-800/50 p-6 rounded-lg shadow-sm border border-gray-700/50">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-100">Featured offers</h2>
                    <button className="px-4 py-2 bg-blue-700/50 text-blue-300 rounded-lg flex items-center space-x-1 hover:bg-blue-600/50 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm italic">No featured offers to display yet.</p>

                </div>

                {/* All Services Section */}
                <div className="bg-gray-800/50 p-6 rounded-lg shadow-sm border border-gray-700/50">
                  <h2 className="text-xl font-semibold text-gray-100 mb-4">All services</h2>
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <input
                      type="text"
                      placeholder="Find all brands or Accounts"
                      className="flex-grow p-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-cyan-500"
                    />
                    <select
                      className="p-2 rounded-md bg-gray-900 text-gray-200 border border-gray-700 focus:outline-none focus:border-cyan-500"
                    >
                      <option>All</option>
                      <option>Category 1</option>
                      <option>Category 2</option>
                    </select>
                  </div>

                  {/* Service Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Service Card 1 */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700/50 transform transition-transform hover:scale-105">
                      <img src="" alt="Service" className="w-full h-24 object-cover" />
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-100 truncate">Clash Of Clans (Global)</h3>
                        <p className="text-xs text-gray-400">Account</p>
                      </div>
                    </div>
                    {/* Service Card 2 */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700/50 transform transition-transform hover:scale-105">
                      <img src="" alt="Service" className="w-full h-24 object-cover" />
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-100 truncate">League of Legends (TR)</h3>
                        <p className="text-xs text-gray-400">Account</p>
                      </div>
                    </div>
                    {/* Service Card 3 */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700/50 transform transition-transform hover:scale-105">
                      <img src="" alt="Service" className="w-full h-24 object-cover" />
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-100 truncate">Valorant (EU)</h3>
                        <p className="text-xs text-gray-400">Account</p>
                      </div>
                    </div>
                    {/* Service Card 4 */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-700/50 transform transition-transform hover:scale-105">
                      <img src="" alt="Service" className="w-full h-24 object-cover" />
                      <div className="p-3">
                        <h3 className="text-sm font-semibold text-gray-100 truncate">PUBG Mobile (Global)</h3>
                        <p className="text-xs text-gray-400">Account</p>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;