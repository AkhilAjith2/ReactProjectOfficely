import "./navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">OFFICELY</span>
          <div className="navItems">
              <button className="button is-black">Home</button>
              <button className="button is-black">Add</button>
              <button className="button is-black">Login</button>
          </div>
      </div>
    </div>
  )
}

export default Navbar