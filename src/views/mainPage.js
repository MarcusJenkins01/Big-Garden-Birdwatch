import './mainPage.css';
import '../App.css'
import BirdTile from '../components/birdTile';
import React, { useState } from 'react';
import CountPopup from '../components/countPopup';


function MainPage() {
  const [birds, setBirds] = useState({
    blackbird: { displayName: "Blackbird", count: 0,
    imageMale: "bird_images/new/blackbird_male.webp",
    imageFemale: "bird_images/new/blackbird_female.webp" },

    blue_tit: { displayName: "Blue tit", count: 0,
    image: "bird_images/new/blue_tit.webp" },
    
    carrion_crow: { displayName: "Carrion crow", count: 0,
    image: "bird_images/new/carrion_crow.webp" },

    chaffinch: { displayName: "Chaffinch", count: 0,
    imageMale: "bird_images/new/chaffinch_male.webp",
    imageFemale: "bird_images/new/chaffinch_female.webp" },

    coal_tit: { displayName: "Coal tit", count: 0,
    image: "bird_images/new/coal_tit.webp" },

    collared_dove: { displayName: "Collared dove", count: 0,
    image: "bird_images/new/collared_dove.webp" },

    dunnock: { displayName: "Dunnock", count: 0,
    image: "bird_images/new/dunnock.webp" },

    feral_pigeon: { displayName: "Feral pigeon", count: 0,
    image: "bird_images/new/feral_pigeon.webp" },

    goldfinch: { displayName: "Goldfinch", count: 0,
    image: "bird_images/new/goldfinch.webp" },

    great_tit: { displayName: "Great tit", count: 0,
    imageMale: "bird_images/new/great_tit_male.webp",
    imageFemale: "bird_images/new/great_tit_female.webp" },

    greenfinch: { displayName: "Greenfinch", count: 0,
    imageMale: "bird_images/new/greenfinch_male.webp",
    imageFemale: "bird_images/new/greenfinch_female.webp" },

    house_sparrow: { displayName: "House sparrow", count: 0,
    imageMale: "bird_images/new/house_sparrow_male.webp",
    imageFemale: "bird_images/new/house_sparrow_female.webp" },

    jackdaw: { displayName: "Jackdaw", count: 0,
    image: "bird_images/new/jackdaw.webp" },

    long_tailed_tit: { displayName: "Long-tailed tit", count: 0,
    image: "bird_images/new/long_tailed_tit.webp" },

    magpie: { displayName: "Magpie", count: 0,
    image: "bird_images/new/magpie.webp" },

    robin: { displayName: "Robin", count: 0,
    image: "bird_images/new/robin.webp" },

    rook: { displayName: "Rook", count: 0,
    image: "bird_images/new/rook.webp" },

    starling: { displayName: "Starling", count: 0,
    image: "bird_images/new/starling.webp" },

    woodpigeon: { displayName: "Wood pigeon", count: 0,
    image: "bird_images/new/wood_pigeon.webp" },

    wren: { displayName: "Wren", count: 0,
    image: "bird_images/new/wren.webp" },
  });
  
  const [searchInput, setSearchInput] = useState("");
  const [editingBird, setEditingBird] = useState(null);
  
  const tilePressed = (birdKey) => {
    setEditingBird(birdKey);
  }

  const searchHandler = (e) => {
    var lowerCase = e.target.value.toLowerCase();
    setSearchInput(lowerCase);
  };

  var filteredBirds = Object.keys(birds).reduce(function (filtered, key) {
      if (birds[key].displayName.toLowerCase().includes(searchInput)) filtered[key] = birds[key];
      return filtered;
  }, {});

  

  return (
    <div className="mainPageContainer">
      <div className="mainPage">
        <div className="topBar">
          <input className="App-button-primary" type="button" value="Report another bird"/>
          <input onChange={searchHandler} className="searchBar" type="text" placeholder="Search"/>
        </div>
        <div className="birdGrid">
          { Object.entries(filteredBirds).map( ([key, value]) =>
          <BirdTile key={key} bird={value} onClick={() => tilePressed(key)}/> ) }
        </div>
        <div className="controls">
          <input className="App-button-neutral" type="button" value="Quit"/>
          <input className="App-button-success" type="button" value="Finish"/>
        </div>
      </div>

      { editingBird != null && <CountPopup birdKey={editingBird} birds={birds} setBirds={setBirds} closePopup={() => setEditingBird(null)}/> }
    </div>
  );
}

export default MainPage;
