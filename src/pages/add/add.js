import React, { useState } from "react";
import {
  TextField,
  Button,
  TextareaAutosize,
  Stack,
  Typography,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Navbar from '../../components/navbar/Navbar';

const AddOfficeSpaceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    image: "",
    features: "",
    price: "",
    taxInfo: "",
    description: "",
    // Add other fields as needed
  });

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Add logic to submit the form data (formData) to your backend or perform other actions
    console.log("Form data submitted:", formData);
  };

  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "64px" }} className="office_space_form">
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
            <IconButton color="primary">
              <AddPhotoAlternateIcon />
            </IconButton>
            <Typography variant="body1" component="label">
              Add Images
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={5}>
            <Stack spacing={3} flexGrow={4}>
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
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              fullWidth
              margin="normal"
            />
          </Stack>

          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </div>
      
    </div>
    
  );
};

export default AddOfficeSpaceForm;

// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   TextareaAutosize,
//   Stack,
//   Typography,
//   InputAdornment,
//   IconButton,
//   Box,
// } from "@mui/material";
// import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// import Navbar from '../../components/navbar/Navbar';

// const AddOfficeSpaceForm = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     address: "",
//     image: "",
//     features: "",
//     price: "",
//     taxInfo: "",
//     description: "",
//     // Add other fields as needed
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [field]: value,
//     }));
//   };

//   const submitHandler = (event) => {
//     event.preventDefault();
//     // Add logic to submit the form data (formData) to your backend or perform other actions
//     console.log("Form data submitted:", formData);
//   };

//   return (
   
//   );
// };

// export default AddOfficeSpaceForm;