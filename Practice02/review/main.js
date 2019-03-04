
const address = ['https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg','https://i.dailymail.co.uk/i/pix/2018/02/02/18/48D3379500000578-5345305-image-a-16_1517595669475.jpg','https://recipes.timesofindia.com/photo/53110049.cms','http://himg2.huanqiu.com/attachment2010/2018/0205/14/36/20180205023629426.jpg','https://media.fox5dc.com/media.fox5dc.com/photo/2018/09/20/getty_pizza_1537444422303_6095945_ver1.0_640_360.jpg'];

const left_button = document.getElementById("left");
const right_button = document.getElementById("right");

let currIndex = 0;
document.getElementById("left").classList.add('disabled');

left_button.addEventListener(
  "click", 
  function() {
    if(currIndex===0){
      return
    }else{
      document.getElementById("display").src = "";
      currIndex-=1;
      document.getElementById("display").src = address[(currIndex+address.length)%address.length];
      currIndex=(currIndex+address.length)%address.length
      document.getElementById("source").innerText ="source: "+ address[(currIndex+address.length)%address.length];
      if (currIndex===0){
        document.getElementById("left").classList.add('disabled');
      } else{
        document.getElementById("left").classList.remove('disabled');
        document.getElementById("right").classList.remove('disabled');
      }
    }
  }
);
right_button.addEventListener(
  "click", 
  function() {
    if(currIndex===address.length-1){
      return
    }else{
      document.getElementById("display").src = "";
      currIndex+=1;
      document.getElementById("display").src = address[(currIndex+address.length)%address.length]; 
      document.getElementById("source").innerText ="source: "+ address[(currIndex+address.length)%address.length];
      if (currIndex===address.length-1){
        document.getElementById("right").classList.add('disabled');
      } else{
        document.getElementById("left").classList.remove('disabled');
        document.getElementById("right").classList.remove('disabled');
      }
    }
  }
);



