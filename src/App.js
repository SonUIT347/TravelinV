import { createContext, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./Pages/Home";
import ReadBlogs from "./Pages/ReadBlogs";
import ProtectedRoutes, {
  ProtecteDashboardColl,
} from "./components/PrivateRouter";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Blogs from "./Pages/Blogs";
import PersonalPage from "./Pages/PersonalPage";
import Footer from "./components/Footer";
import Logout from "./Pages/Logout";
import ProfileInput from "./Pages/ProfileInput";
import FormBlog from "./Pages/FormBlog";
import Admin from "./Pages/admin";
import AboutUs from "./Pages/AboutUs";
import ProvincePost from "./Pages/Province";
import ScrollToTop from "./components/ScrollToTop";
import { ProtecteDashboard } from "./components/PrivateRouter";
import { ProtectLoginout } from "./components/PrivateRouter";
import Collaborator from "./Pages/collaborator";

import MapScreen from "./Pages/Map/MapScreen";
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(() => {
    const storageAccount = JSON.parse(localStorage.getItem("user"));
    return (
      storageAccount ?? {
        username: "",
        loggedIn: false,
        accountType: "",
        image: "",
        token:"",
        id_user: 0,
        
      }
    );
  });
  // 840620172422-p0ioib0pk0ebu85k45f0jap5fmmvnukn.apps.googleusercontent.com

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <GoogleOAuthProvider clientId="840620172422-p0ioib0pk0ebu85k45f0jap5fmmvnukn.apps.googleusercontent.com">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/Blogs" element={<Blogs />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Map" element={<MapScreen />} />
            <Route path="/Blogs/:idProvince" element={<ProvincePost />} />
            <Route path="/Blogs/:idProvince/:idPost" element={<ReadBlogs />} />
            <Route element={<ProtectLoginout />}>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Route>
            <Route path="/Register/Profile" element={<ProfileInput />} />
            {/* <Route path="/Aboutus" element={<AboutUs />} /> */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/CreatePost" element={<FormBlog />} />
              <Route path="/Personal/:userName" element={<PersonalPage />} />
              <Route path="/Profile/:userName" element={<ProfileInput />} />
              <Route element={<ProtecteDashboard />}>
                <Route path="/Dashboard" element={<Admin />} />
              </Route>
              <Route element={<ProtecteDashboardColl />}>
                <Route path="/Dashboard/Coll" element={<Collaborator />} />
              </Route>
              <Route path="/Logout" element={<Logout />} />
            </Route>
          </Route>
        </Routes>
        {/* <Footer /> */}
      </GoogleOAuthProvider>
    </UserContext.Provider>
  );
}

export default App;
