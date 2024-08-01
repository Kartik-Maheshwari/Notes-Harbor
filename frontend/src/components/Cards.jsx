import React from "react";
import Card from "./Card.jsx";

const Cards = ({
  uploads,
  selectedFilter,
  selectedSemester,
  selectedSubject,
}) => {
  const transformUrl = (url) => {
    const urlParts = url.split("/upload/");
    const transformation = "c_thumb,g_north,h_250,w_250,f_jpg";
    return `${urlParts[0]}/upload/${transformation}/${urlParts[1]}`;
  };

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {uploads.map((upload, index) => (
        <Card
          key={index} // Unique key for each card
          title={upload.public_id}
          image={transformUrl(upload.secure_url)}
          description={upload.description}
        />
      ))}
    </div>
  );
};

export default Cards;
