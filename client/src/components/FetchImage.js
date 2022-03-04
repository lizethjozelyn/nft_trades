import { ExploreData } from './../components/ExploreData'
import FetchImage from './components/FetchImage.css'
function FetchImage(element){
    var img = document.getElementById(element);
    for(var i = 0; i < ExploreData.length;i++)
    {
        if(ExploreData[i].src == img.src) // << check this
        {
            if(i === ExploreData.length){
                document.getElementById(element).src = ExploreData[0].src;
                break;
            }
            document.getElementById(element).src = ExploreData[i+1].src;
            break;
        }
    }
}
