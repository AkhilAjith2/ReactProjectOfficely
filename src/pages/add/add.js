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
  ImageListItem, Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from '@mui/icons-material/Flag';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from "../../components/navbar/Navbar";
import OfficeStore from "../../api/OfficeStore";
import { set } from "date-fns";
import {uploadAdditionalPhoto, uploadMainPhoto} from '../../api/photos';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Chip from "@mui/material/Chip";

const officeTypes = ["CONFERENCE_ROOM", "COWORKING_SPACE", "DESK", "OFFICE"];
const amenitiesOptions = [
  "WIFI",
  "COFFEE",
  "TEA",
  "PROJECTOR",
  "WHITEBOARD",
  "PRINTER",
  "SCANNER",
  "FAX",
  "PHONE",
  "KITCHEN",
  "PARKING",
  "ACCESSIBLE",
  "SECURITY",
  "LOCKERS",
  "PETS_ALLOWED",
  "SMOKING_AREA",
];

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
    officeType: "",
    rating: 1,
    officeArea: 1,
    mainPhoto: "",
    photos: []
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const [mainImageIndex, setMainIndex] = useState(0);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    OfficeStore.getState().addOffice(formData)
        .then((response) => response.json())
        .then((data) => {
          console.log("Office data:", data);
          uploadPhotos(data[0].id)
              .finally(() => navigate("/offices"))
              .catch((error) => {
                console.error("Error adding office photos:", error)});
        })
        .catch((error) => {
          console.error("Error adding office data:", error);
        });
  };

  const uploadPhotos = async (officeId) => {
    for(let i = 0; i < uploadedImages.length; i++)
    {
      const image = uploadedImages[i];
      if(mainImageIndex == i)
        await uploadMainPhoto(officeId, image);
      else
        await uploadAdditionalPhoto(officeId, image);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const currentFiles = [...uploadedImages];
    currentFiles.push(file);
    setUploadedImages(currentFiles);
  };

  const handleImageDelete = (index) => {
    if(index == mainImageIndex)
      setMainIndex(0);
    else if(index < mainImageIndex)
      setMainIndex(mainImageIndex-1);

    setUploadedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleMarkMainPhoto = (index) => {
    setMainIndex(index);
  }

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
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
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

              <Grid container spacing={2} style={{ maxHeight: "600px", overflowY: 'auto',marginBottom: '40px' }}>
                {uploadedImages.map((image, index) => (
                    <Grid item key={index} xs={4} style={{marginBottom:'16px', breakInside: 'avoid', height: "250px" }}>
                      <ImageListItem style = {{height: "250px" }}>
                        <img
                            src={URL.createObjectURL(image)}
                            alt={`Uploaded Image ${index}`}
                            style={{ width: "100%", height: "100%", objectFit: "contain", border: index === mainImageIndex ? '2px solid red' : 'none' }}
                        />
                        <IconButton
                            style={{ position: "absolute", top: "5px", right: "40px", color: "orange" }}
                            onClick={() => handleMarkMainPhoto(index)}
                        >
                          <FlagIcon />
                        </IconButton>
                        <IconButton
                            style={{ position: "absolute", top: "5px", right: "5px", color: "red" }}
                            onClick={() => handleImageDelete(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ImageListItem>
                    </Grid>
                ))}
              </Grid>

              <Stack direction={{xs: "column", md: "row"}} spacing={3}>
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
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="officeType-label">Office Type</InputLabel>
                    <Select
                        label="Office Type"
                        placeholder="Office Type"
                        labelId="officeType-label"
                        id="officeType"
                        value={formData.officeType}
                        onChange={(e) => handleInputChange("officeType", e.target.value)}
                        fullWidth
                    >
                      {officeTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
              <FormControl fullWidth margin="normal">
                <InputLabel id="amenities-label">Amenities</InputLabel>
                <Select
                    label="Amenities"
                    placeholder="Amenities"
                    labelId="amenities-label"
                    id="amenities"
                    multiple
                    value={formData.amenities}
                    onChange={(e) => handleInputChange("amenities", e.target.value)}
                    renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map((value) => (
                              <Chip
                                  key={value}
                                  label={value}
                              />
                          ))}
                        </Box>
                    )}
                    fullWidth
                    MenuProps={{
                      sx: {
                        '& .Mui-selected': {
                          color: "#2c3994",
                        },
                      },
                    }}
                >
                  {amenitiesOptions.map((amenity) => (
                      <MenuItem key={amenity} value={amenity}>
                        {amenity}
                      </MenuItem>
                  ))}
                </Select>
              </FormControl>
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