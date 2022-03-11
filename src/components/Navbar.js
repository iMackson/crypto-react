import authService from "../services/authentication";
import { Link } from 'react-router-dom';
import { useState } from "react";

export function Navbar() {

    const [user, setUser] = useState(() => {
      return authService.getUser();
    })
  
    const handleLogout = () => {
      authService.logout()
      setUser(null)
    }
  
    const handleLogin = () => {
      authService.login()
      setUser(authService.getUser())
    }
    return (
      <div>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </nav> 
      </div>
  
    )
  
  }
  

  export default Navbar;