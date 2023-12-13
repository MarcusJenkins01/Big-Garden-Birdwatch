import React from "react";
import "./finishPage.css";
import { useLocation, useOutletContext } from "react-router-dom";

function FinishPage() {
  const [fontSize, headerHeight] = useOutletContext();
  const { state } = useLocation();
  var birds = {};
  if (state !== null) {
    if (state.birds) {
      birds = state.birds;
    }
  }
  
  // Function to process and organize bird data
  const processBirdData = () => {
    if (!birds) {
      return {}; // Return an empty object if birds is undefined or null
    }
    let processedData = {};

    Object.keys(birds).forEach((key) => {
      let bird = birds[key];
      let breed = bird.displayName;

      if (!processedData[breed] && bird.count > 0) {
        processedData[breed] = {
          count: bird.count,
          image: bird.image,
          description: bird.description,
        };
      }
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
        <img src={birdData[breed].image} alt={breed} className="finishBirdImage" />
      )}
      {/* {birdData[breed].description && <p>{birdData[breed].description}</p>} */}
    </div>
  ));

  return (
    <div className="finishPageContainer" style={{minHeight: `calc(100vh - ${headerHeight}px)`}}>
      <div className="resultsTitleContainer">
        <h1>Results submitted</h1>
        <h3>Thank you for your participation.</h3>
      </div>
      <div className="youCounted">
        <h3>You counted:</h3>
      </div>
      <div className="birdListContainer">{birdList}</div>
    </div>
  );
}

export default FinishPage;
