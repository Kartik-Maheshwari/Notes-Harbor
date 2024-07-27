// controllers/followerController.js

import Follower from "../models/Follower.js";
export const getFollowersByUser = async (req, res) => {
  try {
    const followers = await Follower.find({ userId: req.user._id }).populate(
      "followerId"
    );
    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch followers", error });
  }
};

export const removeFollower = async (req, res) => {
  const { followerId } = req.params;

  try {
    await Follower.findOneAndDelete({ userId: req.user._id, followerId });
    res.status(200).json({ message: "Follower removed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove follower", error });
  }
};

export const blockFollower = async (req, res) => {
  const { followerId } = req.params;

  try {
    // Implement block logic here, e.g., adding to a blocked list
    res.status(200).json({ message: "Follower blocked" });
  } catch (error) {
    res.status(500).json({ message: "Failed to block follower", error });
  }
};
