// controllers/followingController.js
import Following from "../models/Following.js";

export const getFollowingsByUser = async (req, res) => {
  try {
    const followings = await Following.find({ userId: req.user._id }).populate(
      "followingId"
    );
    res.status(200).json(followings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch followings", error });
  }
};

export const unfollowUser = async (req, res) => {
  const { followingId } = req.params;

  try {
    await Following.findOneAndDelete({ userId: req.user._id, followingId });
    res.status(200).json({ message: "User unfollowed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unfollow user", error });
  }
};
