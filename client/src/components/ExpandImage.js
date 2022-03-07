function ExpandImage(imgs) {
    var expandImg = document.getElementById("expandedImg");
    expandImg.src = imgs.src;
    expandImg.parentElement.style.display = "block";

    return(
        <div class="container">
            <span onclick="this.parentElement.style.display='none'" class="closebtn">&times;</span>
            <img id="expandedImg" width="100%"></img>
        </div>
    );
  }

  export default ExpandImage;