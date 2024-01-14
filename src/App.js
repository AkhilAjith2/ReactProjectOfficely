import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import AddOfficeSpaceForm from "./pages/add/add";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/add" element={<AddOfficeSpaceForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
