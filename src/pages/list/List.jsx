import React, { useState, useEffect } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select, Pagination } from '@mui/material';
import SearchBar from './Search';
import SearchItem from '../../components/searchItem/SearchItem';
import Navbar from '../../components/navbar/Navbar';
import OfficeStore from '../../api/OfficeStore';
import LoginStore from '../../api/LoginStore';

const List = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [officeSpaces, setOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState(OfficeStore.getState().offices);
  const [sortOption, setSortOption] = useState('default');
  const listRef = React.createRef();

  useEffect(() => {
    OfficeStore.getState()
        .fetchOffices(1000, 0)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          const totalItems = response.length;
          setTotalPages(Math.ceil(totalItems / itemsPerPage));
          OfficeStore.getState().setOffices(response);
          setOfficeSpaces(response);
          setFilteredOfficeSpaces(response);
        })
        .catch(error => console.error(error));
  }, []);

  const handleOfficeUpdate = async () => {
    try {
      const response = await OfficeStore.getState().fetchOffices(1000, 0);
      const data = await response.json();
      
      OfficeStore.getState().setOffices(data);
      setOfficeSpaces(data);
      setFilteredOfficeSpaces(data);
    } catch (error) {
      console.error("Error updating offices:", error);
    }
  };

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedSpaces = officeSpaces.slice(start, end);
    setFilteredOfficeSpaces(slicedSpaces);
  }, [currentPage, officeSpaces]);

  const handleSearch = (searchTerm) => {
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
        sortedSpaces = [...officeSpaces];
        break;
    }

    setFilteredOfficeSpaces(sortedSpaces);
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
      <div>
        <Navbar />
        <Container ref={listRef}>
          <SearchBar onSearch={handleSearch} />
          <FormControl style={{ margin: '20px 0' }}>
            <InputLabel htmlFor="sort">Sort by:</InputLabel>
            <Select id="sort" value={sortOption} onChange={handleSortChange} label="Sort by">
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="alphabetical">Alphabetical</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="features">Office Types</MenuItem>
            </Select>
          </FormControl>
          <div className="listContainer">
              <div className="listWrapper">
                <div className="listResult">
                  {filteredOfficeSpaces.map(space => (
                      <SearchItem key={space.id} space={space} onUpdate={handleOfficeUpdate}/>
                  ))}
                </div>
                <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      paddingTop: '20px', // Adjust as needed
                      marginBottom: '30px'
                    }}
                >
                  <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      size="large"
                  />
                  <div style={{marginLeft: '20px'}}>Page {currentPage} of {totalPages}</div>
                </div>
              </div>
          </div>
        </Container>
      </div>
);
};

export default List;