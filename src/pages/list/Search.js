
import 'bulma/css/bulma.min.css'
import React,{ useState } from 'react';

function SearchBar(props) {

    const [searchTerm1,setSearchTerm] = useState("");

    const searchContainerStyle = {
        width: '65%',
        margin: 'auto',
        marginTop: '30px',
        marginBottom: '30px',
    };

    const handleSearchClick = () => {
        props.onSearch(searchTerm1); 
    };

    return (
        <div style={searchContainerStyle}>
        <div className="field is-grouped">
            <div style={{ flex: '1' }}>
            <input 
                style={{width: '95%'}} 
                className="input" 
                type="text" 
                placeholder="Search term ..."
                value={searchTerm1}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            </div>
            <button className="button is-black" onClick={handleSearchClick}>Search</button>
        </div>  
        </div>
    );
}

export default SearchBar;