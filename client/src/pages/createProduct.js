import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "../components/custominput";
import Meta from "../components/meta";

export function CreateProduct() {
  // initial blank state of form
  const [product, setProduct] = useState({
    title: "",
    user_id: "",
    price: "",
    description: "",
    tags: "",
    url: "",
  });

  const navigate = useNavigate();

  const [image, setImage] = useState("");

  // function to dynamically update fields
  const handleChange = (e) => {
    console.log(product);
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSelectChange = (e) => {
    setProduct({
        ...product,
        tags: e.target.value,
    });
};

  const btnCreateproduct = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "kinbech");
      const dataRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dddudu1pu/image/upload",
        formData
      );
      const imageUrl = dataRes.data.url;
      product.url = imageUrl;
    }
    axios
      .post("/product/create", product)
      .then((response) => {
        window.alert(`Product Created.\nResponse : ${response}`);
        navigate("/profile");
      })
      .catch((error) => window.alert(`Error : ${error}`));
    
  };

  return (
    <>
      <Meta title="Create Product" />
      <div className="create-product py-3">
        <div className="container justify-contents-center">
          <div className="col-8">
              <p className="fs-3 fw-bold">Create your product</p>
              <form className="d-flex flex-column gap-20">
                <CustomInput type="text" onChange={handleChange} name="title" placeholder="Enter name of product" className="product-title w-25"/>
                <CustomInput type="text" onChange={handleChange} name="price" placeholder="Enter price of product" className="product-price w-25"/>
                <CustomInput type="text" onChange={handleChange} name="description" placeholder="Enter description of product" className="product-description w-75 h-200"/>
                <div className="input-group mb-3">
                  <select className="form-select" id="inputGroupSelect01" onChange={handleSelectChange} name="tags" value={product.tags}>
                    <option selected>Choose a tag</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Books and Education">Books and Education</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Computer & Peripherals">Computer & Peripherals</option>
                    <option value="Smartphone & Accessories">Smartphone & Accessories</option>
                    <option value="Games and Toys">Games and Toys</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Appliances">Appliances</option>
                    <option value="Sports and Fitness">Sports and Fitness</option>
                  </select>
                </div>
                <CustomInput type="file" onChange={handleFileChange} name="url" className="product-image" />
                <button className="button w-25" onClick={btnCreateproduct}>Post</button>
              </form>
          </div>
        </div>
      </div>
    </>
  );
}