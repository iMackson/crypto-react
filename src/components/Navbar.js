
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./contexts/authContext";

export function Navbar() {
  const { login,logout, user } = useContext(AuthContext)

  return (
    <nav className="py-5 flex items-center justify-between">
      <ul>
          <li>
              <Link to="/" className="text-blue-500 hover:text-blue-600">Home</Link>
          </li>
      </ul>
      {user ? (
        <button className="px-3 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md" onClick={logout}>Logout</button>
      ) : (
        <button className="px-3 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md" onClick={login}>Login</button>
      )}
    </nav>
  )
  
  }
  

  export default Navbar;