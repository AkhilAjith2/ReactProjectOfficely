import React, { useState, useEffect } from 'react';
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import SearchBar from "./Search";

const List = () => {
  const [officeSpaces, setOfficeSpaces] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/offices')
      .then(response => response.json())
      .then(data => setOfficeSpaces(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Header type="list" />
      <SearchBar></SearchBar>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {officeSpaces.map(space => (
              <SearchItem key={space.id} space={space} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;

