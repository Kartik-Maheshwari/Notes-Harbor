import React, { useState, useEffect, useRef } from "react";
import { AiOutlineUpload, AiOutlineInfoCircle } from "react-icons/ai";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [yearOptions] = useState([1, 2, 3, 4]);
  const [semesterOptions, setSemesterOptions] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    tags: "",
    email: "",
    title: "",
    description: "",
    previewImage: "",
    subjectName: "",
    year: "",
    semester: "",
    isMiscellaneous: false,
  });

  const [isMiscellaneous, setIsMiscellaneous] = useState(false);
  const contentRef = useRef(null); // Ref for the collapsible content section

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    const ext = file.name.split(".").pop().toLowerCase();
    setFileType(ext);
  };

  const isFileTypeValid = () => ["pdf", "docx", "ppt"].includes(fileType);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      userId: profileData?._id,
      name: profileData?.firstname,
      email: profileData?.email,
      [name]: value,
    });

    if (name === "year") {
      const selectedYear = parseInt(value);
      const semesters =
        selectedYear === 1
          ? [1, 2]
          : selectedYear === 2
          ? [3, 4]
          : selectedYear === 3
          ? [5, 6]
          : [7, 8];
      setSemesterOptions(semesters);
      setFormData((prevData) => ({ ...prevData, semester: "" }));
    }
  };

  const handleMiscellaneousChange = (event) => {
    const { value } = event.target;
    setIsMiscellaneous(value === "miscellaneous");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile || !isFileTypeValid()) {
      toast.error("Please select a valid file.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", profileData.firstname);
      data.append("email", profileData.email);
      data.append("userId", profileData._id);
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("subjectName", formData.subjectName);
      data.append("year", isMiscellaneous ? "" : formData.year);
      data.append("semester", isMiscellaneous ? "" : formData.semester);
      data.append("isMiscellaneous", formData.isMiscellaneous);
      data.append("imageFile", selectedFile);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/v1/uploads/",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLoading(false);
      toast.success("Notes uploaded successfully!");

      setSelectedFile(null);
      setFileName("");
      setFileType("");
      setFormData({
        userId: "",
        name: "",
        title: "",
        description: "",
        previewImage: "",
        subjectName: "",
        year: "",
        semester: "",
        isMiscellaneous: false,
      });
    } catch (error) {
      setLoading(false);
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      // Recalculate height dynamically when isMiscellaneous changes
      contentRef.current.style.height = isMiscellaneous
        ? "0px"
        : `${contentRef.current.scrollHeight}px`;
    }
  }, [isMiscellaneous]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-200 ease-in-out transform hover:scale-103 max-w-lg mx-auto mt-10">
      <ToastContainer />
      <div className="bg-gray-100 px-4 py-6">
        <div className="flex flex-col items-center space-y-3">
          <label
            htmlFor="fileUpload"
            className="text-lg font-medium text-gray-700"
          >
            Upload a File (PDF, DOCX, PPT)
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            accept=".pdf,.docx,.ppt"
            style={{ display: "none" }}
          />
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            onClick={() => document.getElementById("fileUpload").click()}
          >
            {loading ? (
              "Uploading..."
            ) : (
              <>
                <AiOutlineUpload className="mr-2" />{" "}
                {selectedFile ? "Change File" : "Choose File "}
              </>
            )}
          </button>
          {selectedFile && (
            <div className="text-base text-gray-700">
              Selected: {fileName} ({fileType.toUpperCase()})
            </div>
          )}
        </div>
      </div>

      <div className="px-4 py-6 space-y-4 overflow-y-auto max-h-[60vh]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-base font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-base font-medium text-gray-700"
            >
              Description
              <AiOutlineInfoCircle className="inline text-blue-500 hover:text-blue-700 cursor-pointer ml-1" />
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="subjectName"
              className="block text-base font-medium text-gray-700"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="subjectName"
              name="subjectName"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
              value={formData.subjectName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base font-medium text-gray-700">
              Is this a miscellaneous note?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="noteType"
                  value="miscellaneous"
                  checked={isMiscellaneous}
                  onChange={handleMiscellaneousChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Yes</span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="noteType"
                  value="non-miscellaneous"
                  checked={!isMiscellaneous}
                  onChange={handleMiscellaneousChange}
                  className="form-radio h-4 w-4 text-blue-600"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>

          {/* Collapsible Section */}
          <div
            ref={contentRef}
            className={`transition-all duration-300 ease-in-out overflow-hidden`}
            style={{
              height: isMiscellaneous
                ? "0px"
                : `${contentRef.current?.scrollHeight}px`,
              opacity: isMiscellaneous ? 0 : 1,
            }}
          >
            {!isMiscellaneous && (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor="year"
                    className="block text-base font-medium text-gray-700"
                  >
                    Year
                  </label>
                  <select
                    id="year"
                    name="year"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                    value={formData.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {yearOptions.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="semester"
                    className="block text-base font-medium text-gray-700"
                  >
                    Semester
                  </label>
                  <select
                    id="semester"
                    name="semester"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:border-blue-500"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Semester
                    </option>
                    {semesterOptions.map((semester) => (
                      <option key={semester} value={semester}>
                        {semester}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Notes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentUpload;
