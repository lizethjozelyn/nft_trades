import logo from './../logo.svg';
import Header from './../components/Header'
import Upload from './../components/FileUpload'
import FetchImage from './../components/FetchImage'
import ExploreData from './../components/ExploreData'
import { Fragment } from 'react';

function Store() {
   return (
      <Fragment>
         <div class="row">
            <div class="column">
               <img src={FetchImage(0)} width="200" height={200}></img>
               <img src={FetchImage(1)} width="200" height={200}></img>
               <img src={FetchImage(2)} width="200" height={200}></img>
               <img src={FetchImage(3)} width="200" height={200}></img>
               <img src={FetchImage(4)} width="200" height={200}></img>
            </div>
         </div>
      </Fragment>
   );

}

export default Store;
