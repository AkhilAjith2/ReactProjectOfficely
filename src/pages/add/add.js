import React, { useState } from "react";
import { TextField, Button, TextareaAutosize, Select, MenuItem, FormControl, InputLabel } from "@mui/material";


const AddOfficeSpaceForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    address: "",
    image: "",
    features: "",
    price: "",
    taxInfo: "",
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
    <form onSubmit={submitHandler}>
      <TextField
        label="Title"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
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
        label="Image URL"
        placeholder="Image URL"
        value={formData.image}
        onChange={(e) => handleInputChange("image", e.target.value)}
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
        label="Tax Information"
        placeholder="Tax Information"
        value={formData.taxInfo}
        onChange={(e) => handleInputChange("taxInfo", e.target.value)}
        fullWidth
        margin="normal"
      />
      {/* Add other form fields as needed */}

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default AddOfficeSpaceForm;
