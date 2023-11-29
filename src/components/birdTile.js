import './birdTile.css';

function BirdTile(props) {
  return (
    <div className="birdTile" onClick={props.onClick}>
      <div className="tileShadowContainer">
        <div className="birdThumbnailContainer">
          <img className="birdThumbnail" src={props.imageUrl}/>
        </div>
        <div className="birdContent">
          <p>{props.name}</p>
          <div className="birdCount">{props.count}</div>
        </div>
      </div>
    </div>
  );
}

export default BirdTile;
