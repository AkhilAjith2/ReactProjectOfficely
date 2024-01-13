import "./navbar.css"
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">OFFICELY</span>
          <div className="navItems">
              <Link to="/hotels" className="button is-black">Home</Link>
              <button className="button is-black">Add</button>
              <Link to="/login" className="button is-black">Log Out</Link>
          </div>
      </div>
    </div>
  )
}

export default Navbar