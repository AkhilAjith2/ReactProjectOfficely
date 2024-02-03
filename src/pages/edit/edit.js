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
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from '../../components/navbar/Navbar';

const EditOfficeSpaceForm = () => {
  const navigate = useNavigate(); 
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    address: "",
    image: "",
    features: "",
    price: "",
    taxInfo: "",
    description: "",
    expanded_images: [],
  });

  useEffect(() => {
    console.log("ID from params:", id);
  
    const fetchOfficeData = async () => {
      try {
        const response = await fetch("http://localhost:3001/offices");
        if (response.ok) {
          const allOfficeData = await response.json();
          console.log("All Office Data:", allOfficeData);
  
          const officeDataById = allOfficeData.find(office => office.id.toString() === id);
          console.log("Office Data by ID:", officeDataById);
  
          if (officeDataById) {
            setFormData(officeDataById);
          } else {
            console.error("Office data not found for id:", id);
          }
        } else {
          console.error("Error fetching all office data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
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

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      // Add your backend URL and configuration (e.g., method, headers) here
      const response = await fetch("http://localhost:3001/offices", {
        method: "POST",
        headers: {
          // Add any necessary headers
        },
        body: formDataToSend,
      });

      if (response.ok) {
        console.log("Form data submitted successfully!");
      } else {
        console.error("Error submitting form data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelHandler = () => {
    
    navigate("/offices");
  };
  
  return (
      <div>
        <Navbar />
        <div className="office_space_form">
          <Typography sx={{marginTop: "2%", paddingLeft: "1.5%"}}>
            <h2>Edit the Office Space Listing</h2>
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
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
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

              <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
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
            </form>
          </Box>
          <Stack
              direction="row"
              justifyContent="space-between"
              marginTop={2}
              sx={{ paddingLeft: "1.25%", paddingRight: "1.25%" }}
          >
          
            {/* Use the cancelHandler function for the onClick event of the Cancel button */}
            <Button variant="outlined" color="error" onClick={cancelHandler}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" sx={{ color: "#fff", backgroundColor: "#000" }}>
              Submit
            </Button>
          </Stack>
        </div>
      </div>
  );
};

export default EditOfficeSpaceForm;
