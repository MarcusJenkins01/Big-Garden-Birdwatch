import './mainPage.css';
import '../App.css'
import BirdTile from '../components/birdTile';
import React, { useState } from 'react';
import CountPopup from '../components/countPopup';

function MainPage() {
  const [birds, setBirds] = useState({
    blackbird: { displayName: "Blackbird", imageUrl: "bird_images/blackbird.jpg", count: 0 },
    blue_tit: { displayName: "Blue tit", imageUrl: "bird_images/blue_tit.jpg", count: 0 },
    carrion_crow: { displayName: "Carrion crow", imageUrl: "bird_images/carrion_crow.jpg", count: 0 },
    chaffinch: { displayName: "Chaffinch", imageUrl: "bird_images/chaffinch.jpg", count: 0 },
    coal_tit: { displayName: "Coal tit", imageUrl: "bird_images/coal_tit.jpg", count: 0 },
    collared_dove: { displayName: "Collared dove", imageUrl: "bird_images/collared_dove.jpg", count: 0 },
    dunnock: { displayName: "Dunnock", imageUrl: "bird_images/dunnock.jpg", count: 0 },
    feral_pigeon: { displayName: "Feral pigeon", imageUrl: "bird_images/feral_pigeon.jpg", count: 0 },
    goldfinch: { displayName: "Goldfinch", imageUrl: "bird_images/goldfinch.jpg", count: 0 },
    great_tit: { displayName: "Great tit", imageUrl: "bird_images/great_tit.jpg", count: 0 },
    greenfinch: { displayName: "Greenfinch", imageUrl: "bird_images/greenfinch.jpg", count: 0 },
    house_sparrow: { displayName: "House sparrow", imageUrl: "bird_images/house_sparrow.jpg", count: 0 },
    jackdaw: { displayName: "Jackdaw", imageUrl: "bird_images/jackdaw.jpg", count: 0 },
    long_tailed_tit: { displayName: "Long-tailed tit", imageUrl: "bird_images/long_tailed_tit.jpg", count: 0 },
    magpie: { displayName: "Magpie", imageUrl: "bird_images/magpie.jpg", count: 0 },
    robin: { displayName: "Robin", imageUrl: "bird_images/robin.jpg", count: 0 },
    rook: { displayName: "Rook", imageUrl: "bird_images/rook.jpg", count: 0 },
    starling: { displayName: "Starling", imageUrl: "bird_images/starling.jpg", count: 0 },
    woodpigeon: { displayName: "Wood pigeon", imageUrl: "bird_images/woodpigeon.jpg", count: 0 },
    wren: { displayName: "Wren", imageUrl: "bird_images/wren.jpg", count: 0 },
  });
  
  const [editingBird, setEditingBird] = useState(null);
  
  const tilePressed = (birdKey) => {
    setEditingBird(birdKey);
  }

  return (
    <div className="mainPageContainer">
      <div className="mainPage">
        <div className="topBar">
          <input className="App-button-primary" type="button" value="Report another bird"/>
          <input className="searchBar" type="text" placeholder="Search"/>
        </div>
        <div className="birdGrid">
          { Object.entries(birds).map( ([key, value]) =>
          <BirdTile key={key} name={value.displayName} imageUrl={value.imageUrl} count={value.count} onClick={() => tilePressed(key)}/> ) }
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
