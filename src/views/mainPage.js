import './mainPage.css';
import '../App.css'
import BirdTile from '../components/birdTile';
import React, { useState } from 'react';
import CountPopup from '../components/countPopup';


function MainPage() {
  const [birds, setBirds] = useState({
    blackbird: { displayName: "Blackbird", count: 0,
    imageMale: "bird_images/new/blackbird_male.webp",
    imageFemale: "bird_images/new/blackbird_female.webp",
    description: "Male blackbirds are jet-black with a bright orange bill and a distinctive orange eye-ring. Female blackbirds are grey-brown, with a more pale bill and a less prominant eye-ring." },

    blue_tit: { displayName: "Blue tit", count: 0,
    image: "bird_images/new/blue_tit.webp",
    description: "Blue tits have a blue cap and white cheeks, with a black stripe running through their eye. Their belly is a vibrant yellow. Female blue tits have slightly greyer upper body, as opposed to blue for male blue tits." },
    
    carrion_crow: { displayName: "Carrion crow", count: 0,
    image: "bird_images/new/carrion_crow.webp",
    description: "The carrion crow is fully black, with a black bill and black feet. Not to be confused with the rook, which has pale grey-white skin where the bill joins the face." },

    chaffinch: { displayName: "Chaffinch", count: 0,
    imageMale: "bird_images/new/chaffinch_male.webp",
    imageFemale: "bird_images/new/chaffinch_female.webp",
    description: "Male chaffinches have a distinctive rust-red face, breast and belly. Females are much less striking, with a brown upper body and a grey-white lower body, but share similar markings on the wings." },

    coal_tit: { displayName: "Coal tit", count: 0,
    image: "bird_images/new/coal_tit.webp",
    description: "Coal tits have a black head and white cheeks. They have an olive-coloured upper back and cream under parts." },

    collared_dove: { displayName: "Collared dove", count: 0,
    image: "bird_images/new/collared_dove.webp",
    description: "The collared dove is pale grey and easily distinguished by its black collar around the back of its neck." },

    dunnock: { displayName: "Dunnock", count: 0,
    image: "bird_images/new/dunnock.webp",
    description: "Dunnocks are primarily grey and brown, with black and brown markings on their wings. Females are similar in appearance to males, but have less prominant markings." },

    feral_pigeon: { displayName: "Feral pigeon", count: 0,
    image: "bird_images/new/feral_pigeon.webp",
    description: "The feral pigeon is grey with an iridescent green and violet plumage - unlike wood pigeons. Their feet are a bright red colour." },

    goldfinch: { displayName: "Goldfinch", count: 0,
    image: "bird_images/new/goldfinch.webp",
    description: "Goldfinches have a vibrant red markings around their bill, with the rest of the face white and black. Their body is white and brown, with bright yellow and black wings with white markings." },

    great_tit: { displayName: "Great tit", count: 0,
    imageMale: "bird_images/new/great_tit_male.webp",
    imageFemale: "bird_images/new/great_tit_female.webp",
    description: "Great tits have a black head with white cheeks. Their underparts are yellow, with a black stripe extending from their head to their legs. The upper back is an olive-green colour. Females have a less prominant black stripe running down their belly." },

    greenfinch: { displayName: "Greenfinch", count: 0,
    imageMale: "bird_images/new/greenfinch_male.webp",
    imageFemale: "bird_images/new/greenfinch_female.webp",
    description: "Male greenfinches are greenish-yellow, with have yellow stripes running along their wings and tail. Female greenfinches have a greyer body, but maintain the yellow markings on the wings." },

    house_sparrow: { displayName: "House sparrow", count: 0,
    imageMale: "bird_images/new/house_sparrow_male.webp",
    imageFemale: "bird_images/new/house_sparrow_female.webp",
    description: "" },

    jackdaw: { displayName: "Jackdaw", count: 0,
    image: "bird_images/new/jackdaw.webp",
    description: "Jackdaws have a black body and cap, with a distinguishable light grey neck and striking pale-blue eyes. Not to be confused with the rook, which is much larger, and has dark eyes and a longer bill." },

    long_tailed_tit: { displayName: "Long-tailed tit", count: 0,
    image: "bird_images/new/long_tailed_tit.webp",
    description: "Long-tailed tits are very small, with unique, long tails. They have an off-white belly, and their wings are black and white. Above each eye is a black stripe, which is parted by the white of their head." },

    magpie: { displayName: "Magpie", count: 0,
    image: "bird_images/new/magpie.webp",
    description: "Magpies are black and white, with a black bill and black eyes. Their wings and tail have a noticeable green and blue iridescence." },

    robin: { displayName: "Robin", count: 0,
    image: "bird_images/new/robin.webp",
    description: "The robin has a rounded brown body, with a distinctive orange face and breast." },

    rook: { displayName: "Rook", count: 0,
    image: "bird_images/new/rook.webp",
    description: "The rook has a glossy black body and wings, with black feet and eyes. They are set apart from carrion crows by the pale off-white skin where their bill joins the face." },

    starling: { displayName: "Starling", count: 0,
    image: "bird_images/new/starling.webp",
    description: "Starlings appear black, but may sometimes be iridescent green and purple. Their bodies are marked in white flecks, and their bill is a bright yellow colour." },

    woodpigeon: { displayName: "Wood pigeon", count: 0,
    image: "bird_images/new/wood_pigeon.webp",
    description: "Wood pigeons have a grey breast and belly, with a slight reddish tint. A white patch can be seen on their neck, with a transition to a darker grey for their head." },

    wren: { displayName: "Wren", count: 0,
    image: "bird_images/new/wren.webp",
    description: "Wrens are very small and rounded, with a large head and small tail. They have a brown upper body, and a paler brown belly. They often hold their tails up vertically." },
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
