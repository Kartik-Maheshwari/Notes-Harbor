// controllers/userController.js

import User from "../models/Userchema.js";

// Follow a user
export const followUser = async (req, res) => {
  try {
    const targetUserId = req.params.id; // ID of the user to be followed
    const currentUserId = req.user.id; // Logged-in user ID, assume it's coming from req.user after authentication

    if (targetUserId === currentUserId) {
      return res.status(403).json({ message: "You cannot follow yourself!" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the current user is already following the target user
    if (!targetUser.followers.includes(currentUserId)) {
      // Add the current user's ID to the target user's followers array
      await targetUser.updateOne({ $push: { followers: currentUserId } });
      // Add the target user's ID to the current user's followings array
      await currentUser.updateOne({ $push: { followings: targetUserId } });
      return res.status(200).json({ message: "User followed successfully!" });
    } else {
      return res.status(403).json({ message: "You already follow this user!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Unfollow a user
export const unfollowUser = async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const currentUserId = req.user.id;

    if (targetUserId === currentUserId) {
      return res.status(403).json({ message: "You cannot unfollow yourself!" });
    }

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser || !currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Check if the current user is following the target user
    if (targetUser.followers.includes(currentUserId)) {
      // Remove the current user's ID from the target user's followers array
      await targetUser.updateOne({ $pull: { followers: currentUserId } });
      // Remove the target user's ID from the current user's followings array
      await currentUser.updateOne({ $pull: { followings: targetUserId } });
      return res.status(200).json({ message: "User unfollowed successfully!" });
    } else {
      return res.status(403).json({ message: "You don't follow this user!" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Fetch users the current user is following
export const getUserFollowings = async (req, res) => {
  try {
    const currentUserId = req.user.id; // Get the logged-in user ID from req.user
    const currentUser = await User.findById(currentUserId).populate(
      "followings",
      "username firstname lastname profilePicture"
    );

    if (!currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(currentUser.followings);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Fetch users who are following the current user
export const getUserFollowers = async (req, res) => {
  try {
    const currentUserId = req.user.id; // Get the logged-in user ID from req.user
    const currentUser = await User.findById(currentUserId).populate(
      "followers",
      "username firstname lastname profilePicture"
    );

    if (!currentUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(currentUser.followers);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
