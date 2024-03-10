import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgimage from "../assets/WEB-02.jpg";
import bgimage2 from "../assets/WEB-01.jpg";

const Register = () => {
  const [data, setData] = useState({
    Name: "",
    Gmail: "",
    Number: "",
  });
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async() => {
    try{
        const Emailid = {
            email:email
        }
        console.log(Emailid,'emailid')
        const response = await axios.post("http://localhost:5000/login", Emailid)
        if(response.status == 201){
            navigate('/home')
        }else(
            console.log(response.message)
        )
        
    }catch(error){
        alert('You are not login, Please register!')
        console.log(error)
    }
    // Here you can perform your login logic using the 'email' state value
    console.log("Logging in with email:", email);
  };

  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", data);
      if (response.status === 201) {
        localStorage.setItem("id", response.data.id);
        navigate("/details");
      } else {
        console.log("already registered");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover"
      style={{
        backgroundImage: `url(${window.innerWidth > 768 ? bgimage : bgimage2})`,
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-3xl w-[1/3] shadow-lg md:w-[600px] md:ml-auto md:mr-[35px] m-3 mt-[120px]">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Fill in the details to Register
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="NAME"
              name="Name"
              value={data.Name}
              onChange={updateData}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold border-white"
              style={{ caretColor: "white" }} // Change the caret color to white
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email ID"
              name="Gmail"
              required
              onChange={updateData}
              value={data.Gmail}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold"
              style={{ caretColor: "white" }} // Change the caret color to white
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="MOBILE NO."
              name="Number"
              required
              value={data.Number}
              onChange={updateData}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold"
              style={{ caretColor: "white" }} // Change the caret color to white
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-[#EC7003] text-white py-1 px-6 rounded-sm text-2xl font-bold">
              REGISTER
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-white text-2xl">Already registered? Login</p>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Email ID"
              value={email}
              name="email"
              onChange={handleChange}
              className="w-full border p-2 focus:outline-none focus:border-[#EC7003] bg-transparent text-white font-bold"
              style={{ caretColor: "white" }} // Change the caret color to white
            />
          </div>
          <div className="mt-2 flex justify-center items-center">
            <button
              className="bg-[#EC7003] text-white py-1 rounded-sm px-6 text-2xl font-bold"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
