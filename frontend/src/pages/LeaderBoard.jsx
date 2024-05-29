import React from 'react';
import { FaStar, FaMedal } from 'react-icons/fa'; // Import icons

const Leaderboard = () => {
  const leaderboardData = [
    { id: 1, name: 'Alice', score: 1000, rating: 4.5 },
    { id: 2, name: 'Bob', score: 800, rating: 3.8 },
    { id: 3, name: 'Charlie', score: 750, rating: 4.2 },
    { id: 4, name: 'David', score: 600, rating: 3.9 },
    { id: 5, name: 'Eve', score: 550, rating: 4.1 },
  ];

  // Function to identify the top-ranked player
  const getTopRankedPlayer = () => {
    const highestScore = Math.max(...leaderboardData.map((player) => player.score));
    return leaderboardData.find((player) => player.score === highestScore);
  };

  const topPlayer = getTopRankedPlayer(); // Get the top-ranked player
  const rest = leaderboardData.slice(3);
  return (
    <div className="container mx-auto  px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center text-primary animate-pulse">Leaderboard</h1>

      {/* Podium section with animation for top player */}
      <div className="flex justify-center">
        <div className="w-1/3 flex flex-col items-center">
          {/* <span className="text-lg font-semibold text-center">Rank 2</span> */}
          <FaMedal className="text-gray-400 text-3xl mb-2" />
          <span className="text-lg font-semibold">{leaderboardData[1]?.name}</span>
        </div>
        <div
          className={`w-1/3 flex flex-col items-center animate-bounce 
          }`}
        >
          {/* <span className=" mt-7text-lg font-semibold text-center">Rank 1</span> */}
          <FaMedal className="text-yellow-500 text-3xl mb-2" />
          {topPlayer && <span className="text-lg font-semibold">{topPlayer.name}</span>}
        </div>
        <div className="w-1/3 flex flex-col items-center">
          {/* <span className="text-lg font-semibold text-center">Rank 3</span> */}
          <FaMedal className="text-orange-500 text-3xl mb-2" />
          <span className="text-lg font-semibold">{leaderboardData[2]?.name}</span>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2 text-center text-primary animate-pulse">Remaining Players</h2>
        <ul className="list-none space-y-2">
          {rest.map((item, index) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 px-4 rounded-lg shadow-md bg-white transform hover:translate-y-[-2px] hover:scale-102 transition duration-300 ease-in-out border border-gray-200"
            >
              <span>{index + 4}. {item.name}</span>
              <div className="flex flex-col items-end">
                <span className="text-gray-700 hover:text-primary">{item.score}</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 mr-2">{item.rating}</span>
                  {[...Array(Math.floor(item.rating))].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 hover:text-primary" />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
