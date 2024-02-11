import React from "react";

const PokemonInfos = ({ height, weight, genus, habitat }) => {
  return (
    <div className="info-container">
      <div>
        <div className="info-detail">
          <h4>Taille</h4>
          <p>{height}</p>
        </div>
        <div className="info-detail">
          <h4>Poids</h4>
          <p>{weight}</p>
        </div>
      </div>
      <div>
        <div className="info-detail">
          <h4>Catégories</h4>
          <p>{genus}</p>
        </div>
        <div className="info-detail">
          <h4>Habitat</h4>
          <p>{habitat}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonInfos;
