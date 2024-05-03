import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext({})

export function UserContextProvider({ children }) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("https://shopbackend-ikrx.onrender.com/api/users/profile", { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Only fetch user profile if user state is null
    if (!user) {
      fetchUserProfile();
    }
  }, [user]);

  const logout = async () => {
    try {
      await axios.post("https://shopbackend-ikrx.onrender.com/api/users/logout", null, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  )

}
