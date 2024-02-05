import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import AddOfficeSpaceForm from "./pages/add/add";
import EditOfficeSpaceForm from "./pages/edit/edit";
import ReservationsTable from "./pages/reservations/reservations"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/offices" element={<List/>}/>
        <Route path="/offices/:id" element={<EditOfficeSpaceForm/>}/>
        <Route path="/add" element={<AddOfficeSpaceForm/>}/>
        <Route path="/reservations/:id" element={<ReservationsTable/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
