import { useContext } from "react";
import { UserContext } from "../App";
const Logout = () => {
  const { setUser } = useContext(UserContext);
  setUser((user)=>{
    const newSetUser = { ...user, userName: '' ,loggedIn: false, accountType: '', image: '', imagePreview: ''}
    const jsonUser = JSON.stringify(newSetUser)
    localStorage.setItem('user', jsonUser)
    return newSetUser
  });
};

export default Logout;
