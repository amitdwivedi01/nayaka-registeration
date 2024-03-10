import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgimage from "../assets/WEB-02.jpg";
import bgimage2 from "../assets/WEB-01.jpg";

const Details = ({ host }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });

  const navigate = useNavigate();
  useEffect(()=>{
    const newlogin = localStorage.getItem("login");
    if(newlogin === 'true'){
        navigate('/')
    }
  },[])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const id = localStorage.getItem("id");
      const updatedFormData = {
        ...formData,
        id: id,
      };
      const response = await axios.post(`${host}/details`, updatedFormData);
      if (response.status === 201) {
        setIsLoading(false);
        navigate("/upload");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting details:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover"
      style={{
        backgroundImage: `url(${window.innerWidth > 768 ? bgimage : bgimage2})`,
      }}
    >
      <div className="bg-black bg-opacity-70 p-6 rounded-3xl w-[350px] shadow-lg md:w-[500px] md:ml-auto md:mr-[35px] mt-[130px]">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Details
        </h2>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Address"
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              required
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              name="city"
              required
              value={formData.city}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="State"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }}
            />
          </div>
          <div className="flex justify-center">
            {isLoading ? (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#EC7003] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <button className="bg-[#EC7003] text-white py-1 px-6 rounded-sm text-2xl font-bold">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Details;
