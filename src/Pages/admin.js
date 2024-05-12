import "../admin.css";
import { MdOutlineArticle } from "react-icons/md";
import { GrGroup } from "react-icons/gr";
import DataPost from "./adminMap";
import { React, useState, useEffect } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

import { HiChevronRight } from "react-icons/hi";
import { DataUser } from "./adminMap";
import Axios, * as others from "axios";
import { Link } from "react-router-dom";
import removeVietnameseTones from "../components/removeVietnameseTones";
const baseURL = process.env.REACT_APP_API_BASE_URL
function Admin() {
  const [search, setSearch] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [posts, setpost] = useState([]);
  const [user, setuser] = useState([]);
  const token = localStorage.getItem("accessToken")
  useEffect(() => {
    Axios.get(`${baseURL}/post/sortbystatus`, { headers: { "Authorization": `Bearer ${token}` } }).then((response) => {
      setpost(response.data);
      setSearch(response.data);
    });
    Axios.get(`${baseURL}/user/getAllUser`).then((response) => {
      setuser(response.data);
      setSearchUser(response.data);
    });
  }, []);
  const [type, settype] = useState("blog");

  function handleEvent(type) {
    if (type === "blog")
      return (
        <div className="info data-item ">
          <DataPost posts={search} />
        </div>
      );
    if (type === "user")
      return (
        <div className="info-user">
          <DataUser user={searchUser} />
        </div>
      );
  }
  function handleBar(type) {
    if (type === "blog")
      return (
        <div className="info-bar-blog">
          <div className="username user-item">Username</div>
          <div className="title user-item">Title</div>
          <div className="create-at user-item">Create at</div>


          <div className="status user-item">Status</div>

        </div>
      );
    if (type === "user")
      return (
        <div className="info-bar">
          <div className="username user-item">Username</div>
          <div className="gender-t user-item">Gender</div>
          <div className="mail-t user-item">Mail</div>
          <div className="phone-t user-item">Phone</div>
          <div className="account-t user-item">Account</div>
          {/* <div className=" user-item">Account</div> */}
        </div>
      );
  }
  const [iconArrow, seticonArrow] = useState("inline");
  const [blogColor, setblogColor] = useState("#F4F2EE");
  const [iconArrow2, seticonArrow2] = useState("none");
  const [userColor, setuserColor] = useState("none");
  const handleArrow = () => {
    setblogColor("#F4F2EE");
    seticonArrow("inline");
    seticonArrow2("none");
    setuserColor("");
  };
  const handleArrow2 = () => {
    seticonArrow2("inline");
    setuserColor("#F4F2EE");
    setblogColor("");
    seticonArrow("none");
  };

  return (
    <div className="admin-page">
      <div className="dashBoard">
        <div className="text1">Pages</div>
        <div
          onClick={handleArrow}
          style={{ backgroundColor: blogColor }}
          className="flex-blog"
        >
          <div className="icon-blog">
            <MdOutlineArticle />
          </div>
          <div className="text2" onClick={() => settype("blog")}>
            Blog
          </div>

        </div>
        <div
          onClick={handleArrow2}
          style={{ backgroundColor: userColor }}
          className="flex-user"
        >
          <div className="icon-user">
            <GrGroup />
          </div>

          <div className="text3" onClick={() => settype("user")}>
            Users
          </div>
        </div>
      </div>

      <div className="main-bar">
        <div className="head">
          <div className="nav-container admin-nav">
            {/* Thanh địa chỉ */}
            <Link to="/">Home</Link>
            <HiChevronRight />
            <a href="#">Dashboard</a>
            <HiChevronRight />
          </div>
          <div className="search-container">
            <div className="text-tour">Admin</div>
            <div className="search-bar">
              <input
                type="text"
                onChange={(text) => {
                  setSearch(
                    posts.filter((post) => {
                      return (
                        removeVietnameseTones(post.post_name)
                          .toLowerCase()
                          .includes(text.target.value.toLowerCase()) ||
                        post.post_name
                          .toLowerCase()
                          .includes(text.target.value.toLowerCase())
                      );
                    })
                  );
                  setSearchUser(
                    user.filter((users) => {
                      return removeVietnameseTones(users.username)
                        .toLowerCase()
                        .includes(text.target.value.toLowerCase()) ||
                        user.username
                          .toLowerCase()
                          .includes(text.target.value.toLowerCase())
                    })
                  );
                }}
                placeholder="Search.."
              />

              <BiSearchAlt2 className="find-icon" />

            </div>
          </div>

        </div>
        {handleBar(type)}
        <div className="listdata-container">{handleEvent(type)} </div>


      </div>
    </div>
  );
}

export default Admin;