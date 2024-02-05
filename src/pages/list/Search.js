import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import styled from '@emotion/styled';
function SearchBar(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const searchContainerStyle = {
        width: '50%',
        margin: 'auto',
        marginTop: '30px',
    };

    const SearchButton = styled(Button)`
        width: 100px;
        height: 40px;
        margin-top: 8px;
        border: none;
        border-radius: 5px;
        background-color: black;
        color: white;
        font-family: "Dubai Medium", serif;
        cursor: pointer;
        transition: background-color 0.1s ease;`

    const handleSearchClick = () => {
        props.onSearch(searchTerm);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };
    
    return (
        <div style={searchContainerStyle}>
            <Grid container spacing={5}>
                <Grid item xs={9.5}>
                    <TextField
                        fullWidth
                        label="Search term ..."
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </Grid>
                <Grid item xs={1}>
                    <SearchButton variant="contained" color="primary" onClick={handleSearchClick}>
                        Search
                    </SearchButton>
                </Grid>
            </Grid>
        </div>
    );
}

export default SearchBar;
