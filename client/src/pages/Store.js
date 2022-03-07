import logo from './../logo.svg';
import Upload from './../components/FileUpload'
import Header from './../components/Header'
import ExploreData from './../components/ExploreData'
import ExpandImage from '../components/ExpandImage'
import FetchImage from './../components/FetchImage'
import { Fragment } from 'react';


function Store() {
   return (
      <Fragment>
         <div className="row">
         <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", columnGap:10, rowGap: 10,}}>
            <div class="column">
               <img src={FetchImage(0)} width="100%" height={200}></img>
            </div>
            <div class="column">
               <img src={FetchImage(1)} width="100%" height={200}></img>
            </div>
            <div class="column">
               <img src={FetchImage(2)} width="100%" height={200}></img>
            </div>
            <div class="column">
               <img src={FetchImage(3)} width="100%" height={200}></img>
            </div>
            <div class="column">
               <img src={FetchImage(4)} width="100%" height={200}></img>
            </div>
         </div>
         </div>   
      </Fragment>
   );

}

export default Store;
