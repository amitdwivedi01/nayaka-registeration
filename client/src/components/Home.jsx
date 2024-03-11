import React from 'react';
import bgimage from '../assets/WEB1-01.jpg';
import bgimage2 from "../assets/800x1800.jpg";



const Home = () => {
    const handleOpenGmail = () => {
        window.open('mailto:events.ceat@gmail.com', '_blank');
    };
    

    return (
        <div
      className="flex flex-col justify-center items-center h-screen bg-cover w-screen"
      style={{
        backgroundImage: `url(${window.innerWidth > 768 ? bgimage : bgimage2})`,
        backgroundSize: "100% 100%",
      }}
    >
            <div className="bg-black bg-opacity-70 p-8 rounded-3xl  shadow-lg flex justify-center items-center flex-col md:w-[350px] md:mr-[65px] m-3 mt-[120px] md:mt-[0px]">                
                <h2 className="text-xl Montserrat mb-4 text-white text-center">Thank you for sharing your details.<br />Stay tuned for further updates about your journey. <br /></h2>
            </div>

            <div className='absolute bottom-4 flex flex-col items-center justify-center'>
            <p className="text-white Montserrat mb-4">Click here if you wish <br /> for make any changes</p>
                <button onClick={handleOpenGmail} className="bg-[#EC7003] text-white px-5 rounded-sm text-xl font-bold">Edit</button>
            </div>
        </div>
    );
};

export default Home;
