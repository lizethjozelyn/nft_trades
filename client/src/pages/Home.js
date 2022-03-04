import React, {useState} from 'react'
import { SliderData } from '../components/SliderData'
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa'

const Home = () => {
  const [current, setCurrent] = useState(0);
  const length = SliderData.length;

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
      Now supporting trading, buying NFTs, and viewing friends' profiles!
    </section>
    <section className="slider">
      <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide}/>
      <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide}/>
      {SliderData.map((slide, index) => {
        return (
          <div className={index === current ? 'slide active' : 'slide'} key={index}>
            {index === current && (<img src={slide.image} alt="astronomy" className="image"/>)}
          </div>
        )
        
      })}
    </section>
    </div>
    </>
  );
};

export default Home;