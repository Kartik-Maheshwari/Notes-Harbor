import React from "react";
import Card from "./Card.jsx";

const Cards = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {/* {data.map((card) => (
      <Card
        key={card.id} // Add a unique key for each card (assuming an 'id' property)
        title={card.title}
        image={card.image}
        description={card.description}
      />
    ))} */}
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Cards;
