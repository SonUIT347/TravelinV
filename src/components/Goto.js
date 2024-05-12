import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
const baseURL = process.env.REACT_APP_API_BASE_URL
const Goto = () =>{
// const gotoDatas = [
//     {
//         id:1,
//         data: "Digital Normal",
//     },
//     {
//         id:2,
//         data: "Social Media",
//     },
//     {
//         id:3,
//         data: "Fech",
//     },
//     {
//         id:4,
//         data: "Lifestyle",
//     },
//     {
//         id:5,
//         data: "Clound",
//     },
//     {
//         id:6,
//         data:"Love anh Thunder"
//     }

// ]
    const [gotoDatas, setgotoDatas] = useState([{}])
    useEffect(()=>{
        const FecthDatas= async ()=>{
            try{
                await axios.get(`${baseURL}/post/public/getGoToProvince`).then((response) =>{
                    setgotoDatas(response.data)
                })
            } catch (err) {
                console.log(err)
            }
        };
        FecthDatas();
    },[])
    return(
      <>
      <div className='goto-li-ctn'>
            {gotoDatas.map((gotoData, index)=>
                    <li className="goto-li">
                    <Link className="goto-a" to = {`/Blogs/${gotoData.id_province}`}>{gotoData.province_name} </Link>
                    </li>
            )}
        </div>
        
    </>
  );
};
export default Goto;
