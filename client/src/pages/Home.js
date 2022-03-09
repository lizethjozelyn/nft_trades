import React, {useEffect, useState} from 'react'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'
import Axios from "axios";
const Home = () => {
  const [current, setCurrent] = useState(0);
  const [SliderData, setSliderData] = useState({});
  
  useEffect(() => {
    // ⬇ This calls my get request from the server
    
    getSlides();
  }, []);
  
  const getSlides = () => {
	  console.log("get img")

  	Axios.get("http://localhost:3305/search/random").then((response) => {
                    // console.log(response.data[0].url);
                    setSliderData(response.data);

                });  
	  
  }
  var SlideArray = [];
  
  const length = SliderData.length;
  for (let i = 0; i < length; i++){
    SlideArray.push(SliderData[i].url);
  }

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(SliderData) || length <= 0) {
    return null;
  }

  return (
    <>
    <div className="background" style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1530569673472-307dc017a82d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80")`,
      backgroundRepeat: 'no-repeat',
    }}>
    <section className="heading">
      Welcome to NFT Trading Simulator
    </section>
    <section className="nftbody">
      Now supporting gifting, buying NFTs, and viewing friends' profiles!
    </section>
    <section className="slider">
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/>
      {SlideArray.map((slide, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (<img src={slide} alt="NFT images" className="image"/>)}
          </div>
        )
        
      })}
    </section>
    </div>
    </>
  );
};

export default Home;