// import React, { useState } from 'react';
// import { AiOutlineHeart, AiOutlineComment, AiOutlineShareAlt } from 'react-icons/ai';

// const SingleCard = ({ user, image, title, description, initialLikes, initialComments, initialShares }) => {
//   const [likes, setLikes] = useState(initialLikes);
//   const [comments, setComments] = useState(initialComments);
//   const [shares, setShares] = useState(initialShares);
//   const [isLiked, setIsLiked] = useState(false); // Track like state
//   const [isMoreVisible, setIsMoreVisible] = useState(false); // Track description visibility

//   const handleLike = () => {
//     if (!isLiked) {
//       setLikes(likes + 1);
//       setIsLiked(true);
//     }
//   };

//   const handleComment = () => {
//     setComments(comments + 1);
//   };

//   const handleShare = () => {
//     setShares(shares + 1);
//   };

//   const handleDescriptionToggle = () => {
//     setIsMoreVisible(!isMoreVisible);
//   };

//   const shortDescription = description.slice(0, 100); // Truncate description
//   const moreDescription = description.slice(100); // Remaining description

//   return (
//     <div className="bg-white rounded-lg shadow-md px-4 py-4 flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center">
//           <img className="w-10 h-10 rounded-full mr-2" src={user.photo} alt="User Photo" />
//           <span className="text-gray-800 font-semibold">{user.name}</span>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button onClick={handleLike} className="text-gray-500 hover:text-blue-500 focus:outline-none">
//             {isLiked ? (
//               <AiOutlineHeart className="text-red-500" /> // Highlight liked icon
//             ) : (
//               <AiOutlineHeart />
//             )}
//             {likes}
//           </button>
//           <button onClick={handleComment} className="text-gray-500 hover:text-blue-500 focus:outline-none">
//             <AiOutlineComment />
//             {comments}
//           </button>
//           <button onClick={handleShare} className="text-gray-500 hover:text-blue-500 focus:outline-none">
//             <AiOutlineShareAlt />
//             {shares}
//           </button>
//         </div>
//       </div>
//       <img className="w-full h-48 object-cover rounded-md mb-4" src={image} alt="Card Image" />
//       <div className="flex flex-col space-y-2">
//         <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
//         <p className="text-gray-600">
//           {isMoreVisible ? `${shortDescription} ${moreDescription}` : shortDescription}
//           {description.length > 100 && (
//             <button onClick={handleDescriptionToggle} className="text-blue-500 hover:text-blue-700 focus:outline-none">
//               {isMoreVisible ? 'Show less' : 'See more'}
//             </button>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SingleCard;
