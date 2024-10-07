import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  const { userId } = useParams(); // Retrieve userId from URL parameters

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("token");
      const profileResponse = await axios.get(
        `http://localhost:3000/v1/profile/${userId}`, // Fetch profile by user ID
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
  }, [userId]);

  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">User Profile</h1>
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
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
        </div>
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
      </div>

      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
        </div>

        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {profileData.firstname || "Not Provided"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {profileData.email || "Not Provided"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {profileData.additionalDetails?.gender ?? "Not Provided"}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {profileData.lastname || "Not Provided"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {profileData.additionalDetails?.contactNumber ?? "Not Provided"}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {profileData.additionalDetails?.dateOfBirth
                  ? formattedDate(profileData.additionalDetails.dateOfBirth)
                  : "Not Provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
