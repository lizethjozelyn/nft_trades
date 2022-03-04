import logo from './../logo.svg';
import Header from './../components/Header' 
import Upload from './../components/FileUpload'
import FetchImage from './../components/FetchImage'
import ExploreData from './../components/ExploreData'

function Store(){
    var expandImg = document.getElementById("expandedImg");
    var imgText = document.getElementById("imgtext");
    expandImg.src = imgs.src;
    imgText.innerHTML = imgs.alt;
    expandImg.parentElement.style.display = "block";
    return(
           <div class="row">
             <div class="column">
               <FetchImage(1)/>
             </div>
             <div class="column">
                <FetchImage(2)/>
             </div>
             <div class="column">
                <FetchImage(3)/>
             </div>
             <div class="column">
                <FetchImage(4)/>
             </div>
           <div class="column">
              <FetchImage(5)/>
           </div>
           </div>


           <div class="container">
             <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>

   
             <img id="expandedImg" style="width:100%">


             <div id="imgtext"></div>
           </div>
           );
   
}

export default Store;
