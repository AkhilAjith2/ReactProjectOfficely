import React, { useState, useEffect } from 'react';
import {Container, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import SearchBar from './Search';
import SearchItem from '../../components/searchItem/SearchItem';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import { OfficeStore } from '../../api/store';

// TODO: paging
const List = () => {
  const [officeSpaces, setOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [sortOption, setSortOption] = useState('default'); // default, alphabetical, price, features

  useEffect(() => {
    // TODO: for some reason it is called twice
    OfficeStore.getState().fetchOffices(0, 0)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (searchTerm) => {
    // TODO: Serverside filtering    
    const filteredSpaces = officeSpaces.filter(space =>
        space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.features.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredOfficeSpaces(filteredSpaces);
  };

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);

    // Sort the officeSpaces based on the selected option
    let sortedSpaces;
    switch (selectedSortOption) {
      case 'alphabetical':
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
            a.title.localeCompare(b.title)
        );
        break;
      case 'price':
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
            parseFloat(a.price) - parseFloat(b.price)
        );
        break;
      case 'features':
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
            a.features.localeCompare(b.features)
        );
        break;
      default:
        // Default is the order in which items are fetched
        sortedSpaces = [...officeSpaces];
        break;
    }

    setFilteredOfficeSpaces(sortedSpaces);
  };

  return (
      <div>
        <Navbar/>
        <Container>
          <Header type="list" />
          <SearchBar onSearch={handleSearch} />
          <FormControl style={{ margin: '20px 0' }}>
            <InputLabel htmlFor="sort">Sort by:</InputLabel>
            <Select id="sort" value={sortOption} onChange={handleSortChange} label="Sort by">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="features">Features</MenuItem>
            </Select>
          </FormControl>
          <div className="listContainer">
            <div className="listWrapper">
              <div className="listResult">
                {filteredOfficeSpaces.map(space => (
                    <SearchItem key={space.id} space={space} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default List;
