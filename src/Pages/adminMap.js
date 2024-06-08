import "../admin.css";
import Axios from "axios";
import { BiX } from "react-icons/bi";
import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const alternatingColor = [" #FFFFFF ", " #F4F2EE"];
const baseURL = process.env.REACT_APP_API_BASE_URL 
function DataPost({ posts }) {
  const { user } = useContext(UserContext);
  console.log(user);
  const [formattedDates, setFormattedDates] = useState([]);

  useEffect(() => {
    const fetchFormattedDates = async () => {
      const formattedDatesArray = [];
      for (const post of posts) {
        try {
          const response = await axios.post(
            "https://travelinv.azurewebsites.net/api/formatddmmyy",
            { date: post.date_time },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          formattedDatesArray.push(response.data);
        } catch (error) {
          console.error("Error formatting date:", error);
          formattedDatesArray.push(null);
        }
      }
      setFormattedDates(formattedDatesArray);
    };

    fetchFormattedDates();
  }, [posts, user.token]);
  const deletePost = (id) => {
    Axios.delete(`${baseURL}/post/delete/${id}`, { headers: { "Authorization": `Bearer ${user.token}` } })
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e))
    window.location.reload(false);
  };
  const checkPost = (id) => {
    console.log(id);
    Axios.put(`${baseURL}/post/updatePostStatus/${id}`, {}, { headers: { "Authorization": `Bearer ${user.token}` } })
      .then((res) => {
        console.log(res.data);
        window.location.reload(false); // Move the reload inside the 'then' block
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      {posts.map((posts, id) => {
        return (
          <div
            className="data-post"
            key={posts.id}
            style={{ backgroundColor: alternatingColor[id % 2] }}
          >
            <div className="user-name user-item">
              <img className="avatar-data" src={posts.image} alt="" />
              <Link to={`/Personal/${posts.username}`}>
                <div className="usename-data">{posts.username}</div>
              </Link>
            </div>

            <Link to={`/Blogs/${posts.id_province}/${posts.id_post}`}>
              <div className="title-data user-item">{posts.post_name}</div>
            </Link>
            <div className="createat-data user-item">
            {formattedDates[id] ? (
              formattedDates[id]
            ) : (
              <span>Loading...</span>
            )}
          </div>
            <button
              onClick={() => checkPost(posts.id_post)}
              className="status-data user-item"
              style={{
                backgroundColor:
                  posts.status === "Pending" ? "#f1bc68" : "indianred",
              }}
            >
              {posts.status}{" "}
            </button>
            {user.accountType === "ROLE_ADMIN" && (
              <button
                onClick={() => {
                  deletePost(posts.id_post);
                }}
                className="deleteBtn"
              >
                <BiX style={{ fontSize: 15 }} />
              </button>
            )}

            {/* <div className="dropdown">
                     <div className="option-data" ><BsThreeDots/></div>
                     <div className="dropdown-content">
                       <ul className="dropdown-option">
                        <li><button onClick={() => checkPost(posts.idPost)} className="check-btn" href="#">Check</button></li>
                        <li><button className="edit-btn">edit</button></li>
                        <li><button onClick={() => deletePost(posts.idPost)} className="delete-btn" href="#">Delete</button></li>
                       </ul>
                     </div>
                </div> */}
          </div>
        );
      })}
    </>
  );
}

export default DataPost;

export function DataUser({ user }) {
  const deleteUser = (u) => {
    // Axios.delete(http://localhost:8800/admin/description/delete/${p}, posts)
    // Axios.delete(http://localhost:8800/admin/like/delete/${p}, posts)
    // Axios.delete(`http://localhost:8800/admin/delete/${u}`, user)
    // Axios.delete(`http://localhost:8800/admin/user/delete/${u}`, user);

    // window.location.reload(false);
  };
  const handleUpdateAccount = (accountType, userName) => {
    console.log(accountType, userName);
    if (accountType === "ROLE_USER") {
      Axios.put(`${baseURL}/user/Role`, {
        accountType: "ROLE_COLLABORATOR",
        username: userName
      }).then((res) => console.log(res))
      window.location.reload(false);
    } else if (accountType === "ROLE_COLLABORATOR") {
      Axios.put(`${baseURL}/user/Role`, {
        accountType: "ROLE_USER",
        username: userName
      }).then((res) => console.log(res))
      window.location.reload(false);
    }
  };
  return (
    <>
      {user.map((user, id) => {
        return (
          <div
            className="user-data"
            key={user.id}
            style={{ backgroundColor: alternatingColor[id % 2] }}
          >
            <div className="user-item">
              <img className="avatar-user" src={user.avatar} />
              <Link to={`/Personal/${user.username}`} className="usename">
                {user.username}
              </Link>
            </div>

            <div className="gender user-item">{user.gender}</div>
            <div className="mail user-item">{user.email}</div>
            <div className="phone user-item">{user.phone_number}</div>
            <div className="account user-item">
              <button
                onClick={() => {
                  handleUpdateAccount(user.role, user.username);
                }}
              >
                {/* {" "} */}
                {user.role}
              </button>
            </div>
            {/* <div className="dropdown">
                     <div className="option-data" ><BsThreeDots/></div>
                     <div className="dropdown-content" >
                       <ul className="dropdown-option-user">
                        <div className='add-mod'>
                        <li><button className="edit-btn" >Edit</button></li>
                        </div>
                        <li><button onClick={()=>{deleteUser(user.userName)}} className="delete-btn" href="#">Delete</button></li>
                       </ul>
                     </div>
                </div> */}

            <button
              onClick={() => {
                deleteUser(user.userName);
              }}
              className="deleteBtn"
            >
              <BiX style={{ fontSize: 15 }} />
            </button>
          </div>
        );
      })}
    </>
  );
}
