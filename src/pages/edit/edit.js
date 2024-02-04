import React, { useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import {
  TextField,
  Button,
  Stack,
  Typography,
  IconButton,
  Box,
  ImageList,
  ImageListItem,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from '../../components/navbar/Navbar';
import OfficeStore from "../../api/OfficeStore";
import { formatOfficeType } from '../../components/searchItem/SearchItem';


const EditOfficeSpaceForm = () => {
  const navigate = useNavigate(); 
  const { id } = useParams();
  const [uploadedImages, setUploadedImages] = useState([]);

  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    pricePerDay: 0,
    isActive: true,
    address: "",
    availableFrom: "2024-02-03T21:46:31.282Z",
    availableTo: "2024-02-03T21:46:31.282Z",
    amenities: [],
    officeType: "CONFERENCE_ROOM",
    rating: 0,
    officeArea: 0,
    mainPhoto: "",
    photos: []
  });

  useEffect(() => {
    console.log("ID from params:", id);
  
    const fetchOfficeData = () => {
      OfficeStore.getState().fetchOffice(id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Office data:", data);
          setFormData(data);
        })
        .catch((error) => {
          console.error("Error fetching office data:", error);
        });
    };
  
    if (id) {
      fetchOfficeData();
    }
  }, [id]);


  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
    console.log("Image uploaded:", file);
  };

  const handleImageDelete = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const submitHandler = async (event) => {
    console.log('Form data:', formData);
    event.preventDefault();
    OfficeStore.getState().updateOffice(formData)
    .then((response) => response.json())
    .then((data) => {
      console.log('Office space updated:', data);
      navigate("/offices");
    })
    .catch((error) => {})
  };

  const cancelHandler = () => {
    navigate("/offices");
  };
  
  return (
      <div>
        <Navbar />
        <div className="office_space_form">
          <Typography sx={{marginTop: "2%", paddingLeft: "1.5%"}}>
            <h2>Edit and View the Office Space Listing</h2>
          </Typography>
          <Box
              sx={{
                padding: { xs: "24px", md: "32px" },
                margin: { xs: "16px", md: "32px" },
                boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
          >
            <form onSubmit={submitHandler}>
              <TextField
                  label="Title"
                  placeholder="Title"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  fullWidth
                  margin="normal"
              />

              <Stack direction="row" alignItems="center" marginY={2}>
                <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                />
                <label htmlFor="imageUpload">
                  <IconButton component="span" color="primary">
                    <AddPhotoAlternateIcon />
                  </IconButton>
                </label>
                <Typography variant="body1" component="label">
                  Add Images
                </Typography>
              </Stack>
              <Stack direction="column" spacing={3} marginY={3}>
              <ImageList variant="masonry" cols={3} gap={10}>
                  {formData.photos.map((imageUrl, index) => {
                    return (
                      <ImageListItem key={index}>
                        <img
                          src={imageUrl}
                          alt={`Expanded Image ${index}`}
                          style={{ width: "100%", height: "100%" }}
                        />
                        <IconButton
                          style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            color: "white",
                          }}
                          onClick={() => handleImageDelete(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ImageListItem>
                    );
                  })}
                  {uploadedImages.map((imageUrl, index) => (
                    <ImageListItem key={index}>
                      <img
                        src={imageUrl}
                        alt={`Uploaded Image ${index}`}
                        style={{ width: "100%", height: "100%" }}
                      />
                      <IconButton
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          color: "white",
                        }}
                        onClick={() => handleImageDelete(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ImageListItem>
                  ))}
              </ImageList>

              </Stack>
              
              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                <Stack spacing={3} flexGrow={4} width={1000}>
                  <TextField
                      label="Price"
                      placeholder="Price"
                      type="number"
                      value={formData.pricePerDay}
                      onChange={(e) => handleInputChange("pricePerDay", e.target.value)}
                      fullWidth
                      margin="normal"
                  />
                  <TextField
                      label="Address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      fullWidth
                      margin="normal"
                  />
                  <TextField
                      label="Features"
                      placeholder="Features"
                      value={formatOfficeType(formData.officeType)}
                      onChange={(e) => handleInputChange("officeType", e.target.value)}
                      fullWidth
                      margin="normal"
                  />
                </Stack>

                <TextField
                    label="Description"
                    placeholder="Description"
                    multiline
                    rows={8}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    fullWidth
                    margin="normal"
                />
              </Stack>
            </form>
          </Box>
          <Stack
              direction="row"
              justifyContent="space-between"
              marginTop={2}
              sx={{ paddingLeft: "1.25%", paddingRight: "1.25%" }}
          >
        
            <Button variant="outlined" color="error" onClick={cancelHandler}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ color: "#fff", backgroundColor: "#000" }} onClick={submitHandler}>
              Submit
            </Button>
          </Stack>
        </div>
      </div>
  );
};

export default EditOfficeSpaceForm;

