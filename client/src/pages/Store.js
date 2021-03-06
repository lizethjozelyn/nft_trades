import React, {Fragment, useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom"
import FileUpload from '../components/FileUpload';
import Axios from "axios";
import Cookies from 'universal-cookie'

const Store = () => {
  const [ExploreData, setExploreData] = useState({});


	function purchase(img){
    const cookies = new Cookies();
    if (cookies.get('username')) { 
       let user = (cookies.get('username')) 
       Axios.post("http://localhost:3305/store/purchase", {
       url: img,
       user: user,
     })
     console.log(img);
     console.log(user);
       alert("Purchase Complete!")
 
     }
     else{
       alert("Please sign in before purchase!")
     }
	};


  useEffect(() => {    
    getSlides();
  }, []);
  
  const getSlides = () => {
     console.log("get img")

     Axios.get("http://localhost:3305/search/unowned").then((response) => {
                    setExploreData(response.data);

                });  
	  
  }
  var ExploreArray = [];
  
  const length = ExploreData.length;
  for (let i = 0; i < length; i++){
    ExploreArray.push(ExploreData[i].url);
  }


  if (!Array.isArray(ExploreData) || length <= 0) {
    return null;
  }

  return (
    <>
    <div className="background" style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1530569673472-307dc017a82d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80")`,
      backgroundRepeat: 'no-repeat',
    }}>
    <section className="heading">
      Buy NFT's Here
    </section>
    <section className="nftbody">
      Click to make a purchase.
    </section>

         <Fragment>
            <div class="grid">
                  <div class = "grid-item">
                     <img className = "grid-image" src={ExploreArray[0]} onClick={function(){purchase(ExploreArray[0])}}></img>
                  </div>
                  <div class = "grid-item">
                     <img className = "grid-image" src={ExploreArray[1]} onClick={function(){purchase(ExploreArray[1])}}></img>
                  </div>
                  <div class = "grid-item">
                     <img className = "grid-image" src={ExploreArray[2]} onClick={function(){purchase(ExploreArray[2])}}></img>
                  </div>
                  <div class = "grid-item">
                     <img className = "grid-image" src={ExploreArray[3]} onClick={function(){purchase(ExploreArray[3])}}></img>
                  </div>
                  <div class = "grid-item">
                     <img className = "grid-image" src={ExploreArray[4]} onClick={function(){purchase(ExploreArray[4])}}></img>
                  </div>
                  <div class = "grid-item">
                     <img className = "grid-image" src={ExploreArray[5]} onClick={function(){purchase(ExploreArray[5])}}></img>
                  </div>
            </div>

          <div className="footer">
               <FileUpload/>
          </div> 
         </Fragment>
    </div>
    </>
  );
};

export default Store;