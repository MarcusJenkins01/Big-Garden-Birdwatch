import React from "react";
import "./finishPage.css";
import { useOutletContext, useNavigate } from "react-router-dom";

function FinishPage({ birds }) {
  const navigate = useNavigate();
  // Function to process and organize bird data
  const processBirdData = () => {
    if (!birds) {
      return {}; // Return an empty object if birds is undefined or null
    }
    let processedData = {};

    Object.keys(birds).forEach((key) => {
      let bird = birds[key];
      let breed = bird.displayName;

      if (!processedData[breed]) {
        processedData[breed] = {
          count: 0,
          image: bird.image,
          description: bird.description,
        };
      }

      processedData[breed].count += bird.count;
    });

    return processedData;
  };

  const birdData = processBirdData();

  // Creating a list of bird entries
  const birdList = Object.keys(birdData).map((breed, index) => (
    <div key={index} className="birdEntry">
      <h3>{breed}</h3>
      <p>Count: {birdData[breed].count}</p>
      {birdData[breed].image && (
        <img src={birdData[breed].image} alt={breed} className="birdImage" />
      )}
      {birdData[breed].description && <p>{birdData[breed].description}</p>}
    </div>
  ));

  return (
    <div className="finishPageContainer">
      <h1>Total Birds Counted</h1>
      <div className="birdListContainer">{birdList}</div>
      <button
        onClick={() => {
          navigate("/main");
        }}
      >
        New Count
      </button>
    </div>
  );
}

export default FinishPage;
