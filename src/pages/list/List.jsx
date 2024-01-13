// import React, { useState, useEffect } from 'react';
// import "./list.css";
// import Navbar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import SearchItem from "../../components/searchItem/SearchItem";
// import SearchBar from "./Search";

// const List = () => {
//   const [officeSpaces, setOfficeSpaces] = useState([]);
//   const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3001/offices')
//       .then(response => response.json())
//       .then(data => {
//         setOfficeSpaces(data);
//         setFilteredOfficeSpaces(data);
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleSearch = (searchTerm) => {
//     const filteredSpaces = officeSpaces.filter(space =>
//       space.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       space.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       space.features.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFilteredOfficeSpaces(filteredSpaces);
//   };

//   return (
//     <div>
//       <Navbar></Navbar>
//       <Header type="list" />
//       <SearchBar onSearch={handleSearch} />
//       <div className="listContainer">
//         <div className="listWrapper">
//           <div className="listResult">
//             {filteredOfficeSpaces.map(space => (
//               <SearchItem key={space.id} space={space} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default List;
import React, { useState, useEffect } from 'react';
import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import SearchItem from "../../components/searchItem/SearchItem";
import SearchBar from "./Search";

const List = () => {
  const [officeSpaces, setOfficeSpaces] = useState([]);
  const [filteredOfficeSpaces, setFilteredOfficeSpaces] = useState([]);
  const [sortOption, setSortOption] = useState('default'); // default, alphabetical, price, features

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
      <Navbar></Navbar>
      <Header type="list" />
      <SearchBar onSearch={handleSearch} />
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange}>
          <option value="default">Default</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="price">Price</option>
          <option value="features">Features</option>
        </select>
      </div>
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
