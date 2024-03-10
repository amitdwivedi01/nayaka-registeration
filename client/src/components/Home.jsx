import React from 'react';
import bgimage from '../assets/WEB-02.jpg';
import bgimage2 from '../assets/WEB-01.jpg';

const Home = () => {
    const handleOpenGmail = () => {
        window.open('mailto:events.ceat@gmail.com', '_blank');
    };
    

    return (
        <div
      className="flex justify-center items-center h-screen bg-cover w-screen"
      style={{
        backgroundImage: `url(${window.innerWidth > 768 ? bgimage : bgimage2})`,
      }}
    >
            <div className="bg-black bg-opacity-70 p-8 rounded-3xl  shadow-lg flex justify-center items-center flex-col  md:mr-[65px] m-3 mt-[120px]">                
                <h2 className="text-3xl font-semibold mb-4 text-white">Thank You!</h2>
                <p className="text-white mb-4">Want to change the details? Mail us.</p>
                <button onClick={handleOpenGmail} className="bg-[#EC7003] text-white py-1 px-4 rounded-sm text-xl font-bold">Mail Us</button>
            </div>
        </div>
    );
};

export default Home;
