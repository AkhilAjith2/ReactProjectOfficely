import React from "react";
import "./searchItem.css";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import OfficeStore from "../../api/OfficeStore";
export const formatOfficeType = (officeType) => {
  const lowerCaseOfficeType = officeType.toLowerCase();
  const words = lowerCaseOfficeType.split('_');
  const formattedOfficeType = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return formattedOfficeType;
};

const SearchItem = ({ space }) => {
  const navigate = useNavigate();

  const handleDeleteClick = (office) => {
    OfficeStore.getState().deleteOffice(office);
  };

  
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
        <span className="siPrice">{`$${space.pricePerDay}`}</span>
      </div>
      <div className="siDetails">
        <DeleteIcon onClick={() => handleDeleteClick(space)}/>
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
      </div>
    </div>
  );
};

export default SearchItem;

