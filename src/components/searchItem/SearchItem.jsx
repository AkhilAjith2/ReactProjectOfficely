import React, { useState } from "react";
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

const SearchItem = ({ space, onUpdate }) => {
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = async (office) => {
    try {
      console.log("Delete Clicked");
      await OfficeStore.getState().deleteOffice(office);

      // Call the onUpdate function from props to update the office list
      onUpdate();
    } catch (error) {
      console.error("Error deleting office:", error);
    }
  };

  const handleDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  const handleDeleteConfirmed = () => {
    handleDeleteClick(space);
    setShowDeleteConfirmation(false);
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
          <div className="tooltip">
            <DeleteIcon
                onClick={handleDeleteConfirmation}
                className="deleteIcon"
            />
            {showDeleteConfirmation && (
                <div className="tooltipText">
                  <p>Are you sure you want to delete this office?</p>
                  <button onClick={handleDeleteConfirmed}>Yes</button>
                  <button onClick={handleDeleteCancel}>No</button>
                </div>
            )}
          </div>
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
