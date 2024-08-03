import User from "../models/Userchema.js";

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have a middleware that adds user to req
    const {
      firstname,
      lastname,
      email,
      additionalDetails: { about, gender, contactNumber, dateOfBirth },
    } = req.body;

    // Create an update object
    const updateFields = {};

    if (firstname) updateFields.firstname = firstname;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (about || gender || contactNumber || dateOfBirth) {
      updateFields.additionalDetails = {};
      if (about) updateFields.additionalDetails.about = about;
      if (gender) updateFields.additionalDetails.gender = gender;
      if (contactNumber)
        updateFields.additionalDetails.contactNumber = contactNumber;
      if (dateOfBirth) updateFields.additionalDetails.dateOfBirth = dateOfBirth;
    }

    // Find the user by ID and update their information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
