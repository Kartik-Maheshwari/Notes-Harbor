import React from "react";
import Card from "./Card.jsx";

const Cards = ({
  uploads,
  selectedFilter,
  selectedSemester,
  selectedSubject,
}) => {
  const transformUrl = (url) => {
    if (!url) return ""; // Handle empty URLs
    const urlParts = url.split("/upload/");
    const transformation = "c_thumb,g_north,h_250,w_250,f_jpg";
    return `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`;
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      {uploads.map((upload, index) => {
        // Safely access public_id
        const publicId = upload.public_id || "";
        const fileName = publicId.replace("Codehelp/", "") + ".pdf"; // Fallback to an empty string if undefined

        return (
          <Card
            key={index}
            title={upload.title}
            image={transformUrl(upload.secure_url)}
            description={upload.description || "No description available."} // Fallback description
            fileUrl={upload.secure_url}
            note_id={upload.asset_id}
            style={{ width: "300px", height: "400px" }} // Adjust as needed
            name={upload.name}
          />
        );
      })}
    </div>
  );
};

export default Cards;
