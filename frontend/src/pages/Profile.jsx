import { RiEditBoxLine, RiSaveLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import IconBtn from "../components/IconBtn";

export default function Profile() {
  const [profileData, setProfileData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    additionalDetails: {
      about: "",
      gender: "",
      contactNumber: "",
      dateOfBirth: "",
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const profileResponse = await axios.get(
        "http://localhost:3000/v1/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfileData(profileResponse.data);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleAdditionalDetailsChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      additionalDetails: {
        ...profileData.additionalDetails,
        [name]: value,
      },
    });
  };

  const saveProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:3000/v1/profile/update", profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex items-center gap-x-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // Placeholder image
            alt={`profile-${profileData.firstname}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {profileData.firstname && profileData.lastname
                ? profileData.firstname + " " + profileData.lastname
                : "Loading..."}
            </p>
            <p className="text-sm text-richblack-300">
              {profileData.email || "Loading..."}
            </p>
          </div>
        </div>
        <IconBtn
          text={isEditing ? "Save" : "Edit"}
          onclick={isEditing ? saveProfileData : () => setIsEditing(true)}
        >
          {isEditing ? <RiSaveLine /> : <RiEditBoxLine />}
        </IconBtn>
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text={isEditing ? "Save" : "Edit"}
            onclick={isEditing ? saveProfileData : () => setIsEditing(true)}
          >
            {isEditing ? <RiSaveLine /> : <RiEditBoxLine />}
          </IconBtn>
        </div>
        {isEditing ? (
          <textarea
            name="about"
            value={profileData.additionalDetails.about}
            onChange={handleAdditionalDetailsChange}
            className="w-full p-2 rounded-md bg-richblack-600 text-richblack-5"
          />
        ) : (
          <p
            className={`${
              profileData.additionalDetails?.about
                ? "text-richblack-5"
                : "text-richblack-400"
            } text-sm font-medium`}
          >
            {profileData.additionalDetails?.about ??
              "Write Something About Yourself"}
          </p>
        )}
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text={isEditing ? "Save" : "Edit"}
            onclick={isEditing ? saveProfileData : () => setIsEditing(true)}
          >
            {isEditing ? <RiSaveLine /> : <RiEditBoxLine />}
          </IconBtn>
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              {isEditing ? (
                <input
                  type="text"
                  name="firstname"
                  value={profileData.firstname}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-richblack-600 text-richblack-5"
                />
              ) : (
                <p className="text-sm font-medium text-richblack-5">
                  {profileData.firstname || "Add First Name"}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-richblack-600 text-richblack-5"
                />
              ) : (
                <p className="text-sm font-medium text-richblack-5">
                  {profileData.email || "Add Email"}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              {isEditing ? (
                <input
                  type="text"
                  name="gender"
                  value={profileData.additionalDetails.gender}
                  onChange={handleAdditionalDetailsChange}
                  className="w-full p-2 rounded-md bg-richblack-600 text-richblack-5"
                />
              ) : (
                <p className="text-sm font-medium text-richblack-5">
                  {profileData.additionalDetails?.gender ?? "Add Gender"}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              {isEditing ? (
                <input
                  type="text"
                  name="lastname"
                  value={profileData.lastname}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-md bg-richblack-600 text-richblack-5"
                />
              ) : (
                <p className="text-sm font-medium text-richblack-5">
                  {profileData.lastname || "Add Last Name"}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              {isEditing ? (
                <input
                  type="text"
                  name="contactNumber"
                  value={profileData.additionalDetails.contactNumber}
                  onChange={handleAdditionalDetailsChange}
                  className="w-full p-2 rounded-md bg-richblack-600 text-richblack-5"
                />
              ) : (
                <p className="text-sm font-medium text-richblack-5">
                  {profileData.additionalDetails?.contactNumber ??
                    "Add Contact Number"}
                </p>
              )}
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              {isEditing ? (
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profileData.additionalDetails.dateOfBirth}
                  onChange={handleAdditionalDetailsChange}
                  className="w-full p-2 rounded-md bg-richblack-600 text-richblack-5"
                />
              ) : (
                <p className="text-sm font-medium text-richblack-5">
                  {profileData.additionalDetails?.dateOfBirth
                    ? formattedDate(profileData.additionalDetails.dateOfBirth)
                    : "Add Date Of Birth"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
