import React from "react";
import "./searchItem.css";
import { useNavigate } from 'react-router-dom';

export const formatOfficeType = (officeType) => {
  const lowerCaseOfficeType = officeType.toLowerCase();
  const words = lowerCaseOfficeType.split('_');
  const formattedOfficeType = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedOfficeType;
};

const SearchItem = ({ space }) => {
  const navigate = useNavigate();

  
  return (
    <div className="searchItem">
      
      {space.mainPhoto.length > 0 && (
        
        <img
          src={space.mainPhoto}
          alt={space.name}
          className="siImg"
        />
      
      )}
      <div className="siDesc">
        <h1 className="siTitle">{space.name}</h1>
        <span className="siSubtitle">{space.address}</span>
        <span className="siFeatures">{formatOfficeType(space.officeType)}</span>
      </div>
      <div className="siDetails">
        <button
          className="siCheckButton"
          onClick={() => navigate(`/offices/${space.id}`)}
        >
          Edit
        </button>
        <button
          className="siCheckButton"
          onClick={() => navigate(`/reservations/${space.id}`)}
        >
          Reservations
        </button>
        <div className="siDetailTexts">
          <span className="siPrice">{`$${space.pricePerDay}`}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;




