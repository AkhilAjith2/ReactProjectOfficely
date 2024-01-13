import React, { useState, useEffect } from 'react';
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import SearchBar from "./Search";

const List = () => {
  const [officeSpaces, setOfficeSpaces] = useState([]);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/offices')
      .then(response => response.json())
      .then(data => {
        setOfficeSpaces(data);
        setFilteredOfficeSpaces(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredSpaces = officeSpaces.filter(space =>
      space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.features.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredOfficeSpaces(filteredSpaces);
  };

  return (
    <div>
      <Navbar></Navbar>
      <Header type="list" />
      <SearchBar onSearch={handleSearch} />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {filteredOfficeSpaces.map(space => (
              <SearchItem key={space.id} space={space} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
