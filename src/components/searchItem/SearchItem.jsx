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
        <h1 className="siTitle" onClick={() => navigate(`/hotels/${space.id}`)}>{space.title}</h1>
        <span className="siSubtitle" onClick={() => navigate(`/hotels/${space.id}`)}>{space.address}</span>
        <span className="siFeatures" onClick={() => navigate(`/hotels/${space.id}`)}>{space.features}</span>
      </div>
      <div className="siDetails">
        <button className="siCheckButton" onClick={() => navigate(`/hotels/${space.id}`)}>Edit</button>
        <div className="siDetailTexts">
          <span className="siPrice">{`$${space.price}`}</span>
          <span className="siTaxOp">{space.taxInfo}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;



