import React from "react";
import "./searchItem.css";
import { useNavigate } from 'react-router-dom'
const SearchItem = ({ space }) => {
  const navigate = useNavigate();
  return (
    <div className="searchItem">
      <img
        src={space.image}
        alt={space.title}
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle" >{space.title}</h1>
        <span className="siSubtitle">{space.address}</span>
        <span className="siFeatures">{space.features}</span>
      </div>
      <div className="siDetails">
        <button className="siCheckButton" onClick={() => navigate(`/offices/${space.id}`)}>Edit</button>
        <div className="siDetailTexts">
          <span className="siPrice">{`$${space.price}`}</span>
          <span className="siTaxOp">{space.taxInfo}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;



