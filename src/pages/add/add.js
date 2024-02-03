import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "../../components/navbar/Navbar";
import OfficeStore from "../../api/OfficeStore";

const AddOfficeSpaceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    description: "",
    pricePerDay: 0,
    isActive: true,
    address: "",
    availableFrom: "2024-01-01T00:00:00.0000",
    availableTo: "2030-01-01T00:00:00.0000",
    amenities: [],
    officeType: "CONFERENCE_ROOM",
    rating: 0,
    officeArea: 0,
    mainPhoto: "",
    photos: []
  });

  const [uploadedImages, setUploadedImages] = useState([]);
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
    setUploadedImages((prevImages) => [...prevImages, URL.createObjectURL(file)]);
    console.log("Image uploaded:", file);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    OfficeStore.getState().addOffice(formData)
      .then((response) => response.json())
      .then((data) => {
        console.log("Office data:", data);
        navigate("/offices");
      })
      .catch((error) => {
        console.error("Error adding office data:", error);
      });
  };

  const handleImageDelete = (index) => {
    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const cancelHandler = () => {
    navigate("/offices");
  };

  return (
      <div>
        <Navbar />
        <div className="office_space_form">
          <Typography sx={{ marginTop: "2%", paddingLeft: "1.5%" }}>
            <h2>Create A New Office Listing</h2>
          </Typography>
          <Box
              sx={{
                padding: {xs: "24px", md: "32px"},
                margin: {xs: "16px", md: "32px"},
                boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                backgroundColor: "#fff",
              }}
          >
            <form onSubmit={submitHandler}>
              <TextField
                  label="Title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  fullWidth
                  margin="normal"
              />

              <Stack direction="row" alignItems="center" marginY={2}>
                <input
                    type="file"
                    id="imageUpload"
                    style={{display: "none"}}
                    onChange={handleImageUpload}
                />
                <label htmlFor="imageUpload">
                  <IconButton component="span" color="primary">
                    <AddPhotoAlternateIcon/>
                  </IconButton>
                </label>
                <Typography variant="body1" component="label">
                  Add Images
                </Typography>
              </Stack>

              <ImageList variant="masonry" cols={3} gap={5}>
                {uploadedImages.map((imageUrl, index) => (
                    <ImageListItem key={index}>
                      <img
                          src={imageUrl}
                          alt={`Uploaded Image ${index}`}
                          style={{width: "100%", height: "100%"}}
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
                        <DeleteIcon/>
                      </IconButton>
                    </ImageListItem>
                ))}
              </ImageList>

              <Stack direction={{xs: "column", md: "row"}} spacing={3}>
                <Stack spacing={3} flexGrow={4} width={1000}>
                  <TextField
                      label="Price"
                      placeholder="Price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
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
                      value={formData.features}
                      onChange={(e) => handleInputChange("features", e.target.value)}
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
              <Stack
                  direction="row"
                  justifyContent="space-between"
                  marginTop={2}
                  sx={{ paddingLeft: "1.25%", paddingRight: "1.25%" }}
              >
                <Button variant="outlined" color="error" onClick={cancelHandler}>
                  Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ color: "#fff", backgroundColor: "#000" }}
                    onClick={submitHandler}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Box>
        </div>
      </div>
  );
};
export default AddOfficeSpaceForm;