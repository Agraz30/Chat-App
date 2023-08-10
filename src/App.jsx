import { Home } from "./pages/Home";
import Login from "./pages/Login";
import { Register } from "./pages/Register";
import "./style.scss"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {currentuser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) =>{
    if(!currentuser){
      return <Navigate to="/Login"/>
    }

    return children;

  }

  return(
    <BrowserRouter>
       <Routes>
          <Route path="/">
              <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
          </Route>

       </Routes>
    </BrowserRouter>

    // <Register/>
    // <Login/>
    // <Home/>

  )
}

export default App;
