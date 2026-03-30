// Matthew Hurst | CSCE 242

import "./InfluencerCard.css";

export default function InfluencerCard({ img, name, youtube }) {
  return (
    <a className="influencer-card" href={youtube} target="_blank" rel="noopener noreferrer">
      <div className="upper-frame">
        <img src={img} alt={name} />
        <p>{name}</p>
      </div>
    </a>
  );
}
