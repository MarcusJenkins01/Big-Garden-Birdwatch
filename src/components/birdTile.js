import { useState } from 'react';
import './birdTile.css';

function BirdTile(props) {
  var bird = props.bird;
  var hasSex = bird.imageMale && bird.imageFemale;
  const [sex, setSex] = useState("m");
  var imageSrc = hasSex ? (sex === "f" ? bird.imageFemale : bird.imageMale) : bird.image;

  return (
    <div className="birdTile">
      <div className="tileShadowContainer">
        { hasSex ?
          <div className="sexButtons">
            <button className={sex === "m" ? "selected" : ""} onClick={() => setSex("m")}>M</button>
            <button className={sex === "f" ? "selected" : ""} onClick={() => setSex("f")}>F</button>
          </div>
          : <div className="sexButtons">
            <button className="greyed">M</button>
          </div>
        }
        <div className="birdThumbnailContainer" onClick={props.onClick}>
          <img className="birdThumbnail" src={imageSrc}/>
        </div>
        <div className="birdContent" onClick={props.onClick}>
          <p>{bird.displayName}</p>
          <div className="birdCount">{bird.count}</div>
        </div>
      </div>
    </div>
  );
}

export default BirdTile;
