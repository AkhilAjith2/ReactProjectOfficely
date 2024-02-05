import React, { useState, useEffect } from 'react';
import {Container, FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import SearchBar from './Search';
import SearchItem from '../../components/searchItem/SearchItem';
import Navbar from '../../components/navbar/Navbar';
import OfficeStore from '../../api/OfficeStore';
import LoginStore from '../../api/LoginStore';

// TODO: paging
const List = () => {
  const [officeSpaces, setOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    OfficeStore.getState().fetchOffices(30, 0)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          OfficeStore.getState().setOffices(response);
          setOfficeSpaces(response);
          setFilteredOfficeSpaces(response);
        })
        .catch(error => console.error(error));
  }, []);

  const handleSearch = (searchTerm) => {
    // TODO: Serverside filtering    
    const filteredSpaces = officeSpaces.filter(space =>
        space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.officeType.toLowerCase().includes(searchTerm.toLowerCase())
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
            a.name.localeCompare(b.name)
        );
        break;
      case 'price':
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
            parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay)
        );
        break;
      case 'features':
        sortedSpaces = [...filteredOfficeSpaces].sort((a, b) =>
            a.officeType.localeCompare(b.officeType)
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