import React, { useEffect, useState } from "react";
import axios from "axios";
import bgimage from '../assets/WEB1-01.jpg';
import bgimage2 from "../assets/WEB-Page.jpg";
import { useNavigate } from 'react-router-dom';

const Upload = ({host}) => {
  const [photo, setPhoto] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [Pan, setPan] = useState(null);
  const [passport, setPassport] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const newlogin = localStorage.getItem("login");
    if(newlogin === 'true'){
        navigate('/')
    }
  },[])

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1000000) {
        alert("File size should be less than 1MB");
        e.target.value = null; // Reset file input
      } else if (!file.type.includes("image")) {
        alert("Only image files are allowed");
        e.target.value = null; // Reset file input
      } else {
        setImage(file);
      }
    }
  };

  const handleUpload = async () => {
    setIsLoading(true);
    const id = localStorage.getItem("id");
        const uploadToCloudinary = async(file)=>{
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'jksuem3q');
            try {
                const response = await axios.post('https://api.cloudinary.com/v1_1/depzzdss5/image/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Uploaded successfully:', response.data.secure_url);
                return response.data.secure_url
                // Here you can send the Cloudinary URLs to your backend
            } catch (error) {
                console.error('Error uploading files:', error);
            }
        }

        const personPhoto = await uploadToCloudinary(photo)
        const docFront = await uploadToCloudinary(frontImage)
        const docBack = await uploadToCloudinary(backImage)
        
        const pancard = Pan ? await uploadToCloudinary(Pan) : '';        
        const passportdoc = passport ? await uploadToCloudinary(passport) : '';
        
        const data = {
            id: id,
            personPhoto:personPhoto,
            docFront: docFront,
            docBack: docBack,
            pan: pancard,
            passport: passportdoc,
        }
    try{
        const response = await axios.post(`${host}/upload`, data);
        if (response.status === 201) {
            localStorage.setItem("login", 'true');
            setIsLoading(false);
            navigate('/home');
        }
    }catch(error){
        setIsLoading(false);
        console.log('error uploading file', error)
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover w-screen"
      style={{
        backgroundImage: `url(${window.innerWidth > 768 ? bgimage : bgimage2})`,
        backgroundSize: "100% 100%",
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-3xl w-[1/3] shadow-lg md:w-[600px] md:ml-auto md:mr-[65px] m-3 mt-[120px] md:mt-[0px]">
        <h2 className="text-3xl mb-4 text-center Montserrat text-white">
          Document Upload <span className="text-xl">(size limit: 1mb each)</span>
        </h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="photo" className="text-white Montserrat">
              Recent Photo (passport size)
            </label>
            <input
              type="file"
              id="photo"
              required
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => handleFileChange(e, setPhoto)}
            />
          </div>
          <div>
            <label htmlFor="frontImage" className="text-white Montserrat">
              Aadhar Front
            </label>
            <input
              type="file"
              required
              id="frontImage"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => handleFileChange(e, setFrontImage)}
            />
          </div>
          <div>
            <label htmlFor="backImage" className="text-white Montserrat">
              Aadhar Back
            </label>
            <input
              type="file"
              required
              id="backImage"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => handleFileChange(e, setBackImage)}
            />
          </div>
          <div>
            <label htmlFor="pan" className="text-white Montserrat">
              Pan Card
            </label>
            <input
              type="file"
              id="pan"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => handleFileChange(e, setPan)}
            />
          </div>
          <div>
            <label htmlFor="passport" className="text-white Montserrat">
              Passport
            </label>
            <input
              type="file"
              id="passport"
              className="w-full border-b-2 border-gray-300 p-2 focus:outline-none focus:border-indigo-500"
              onChange={(e) => handleFileChange(e, setPassport)}
            />
          </div>
          <div>
            <div className="flex justify-center">
              {isLoading ? (
                <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-[#EC7003] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                  className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
              </div>
              ) : (
                <button
                  type="button"
                  onClick={handleUpload}
                  className="bg-[#EC7003] text-white py-1 px-4 rounded-sm text-xl font-bold"
                >
                  UPLOAD
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
