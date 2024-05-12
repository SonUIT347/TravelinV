import React, { useState } from "react";
import "../formBlog.css";

import { BiPlus } from "react-icons/bi";

import ImageUploading from "react-images-uploading";

function Input({ id, descriptions, setDescriptions }) {
  const [description, setDescription] = useState({ id: id });

  const [images, setImages] = React.useState([]);
  const [showAddBtn, setShowAddBtn] = useState(true);

  const maxNumber = 2;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    if (imageList.length === 2) {
      // const addImgBtns = document.querySelectorAll(".add-img-btn");
      // addImgBtns.forEach((addBtn) => {
      //   addBtn.classList.add("hidden");
      // });
      setShowAddBtn(false)
    }

    setImages(imageList);

    if (imageList.length === 1) {
      setDescription({
        ...description,
        image1: imageList[0].file,
      });
      descriptions[id] = {
        ...description,
        image1: imageList[0].file,
      };
      setDescriptions(descriptions);
    } else if (imageList.length === 2) {
      setDescription({ ...description, image2: imageList[1].file });
      descriptions[id] = { ...description, image2: imageList[1].file };
      setDescriptions(descriptions);
    }
  };

  const handleChangeDes = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
    descriptions[id] = { ...description, [e.target.name]: e.target.value };
    setDescriptions(descriptions);
  };


  return (
    <div className="input-container ">
      <div className="des-head">
        <h3>Description </h3>
        {/* <AiOutlineClose/> */}
      </div>
      <input
        type="text"
        class="title-description"
        name="title"
        onChange={handleChangeDes}
        placeholder="Write the title  of your description  ....."
      ></input>
      <textarea
        id="message"
        name="description"
        onChange={handleChangeDes}
        placeholder="Write the description of your blog...."
      />
      <div className="App">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          // acceptType={["jpg"]}
        >
          {({ imageList, onImageUpload }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image.data_url} alt="" width="100" />
                </div>
              ))}
              {showAddBtn && (
                <button className="add-img-btn" onClick={onImageUpload}>
                <BiPlus className="preview_des--icon" />
                Upload photo
              </button>
              )}
              
            </div>
          )}
        </ImageUploading>
      </div>
    </div>
  );
}

export default Input;