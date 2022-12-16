//to open the setting box
let setting = document.querySelector(".setting");
let toggle=document.querySelector(".setting").querySelector(".toggle");
let icon=document.querySelector(".setting").querySelector("i");
toggle.onclick = function () {
    setting.classList.toggle("open");
    icon.classList.toggle("fa-spin")
}



//change colors
let list= document.querySelectorAll(".colorList li");
let mainColor =window.localStorage.getItem("color");
if( mainColor !== null) {
     document.documentElement.style.setProperty('--main-color' , mainColor);
     list.forEach( (el) => {
         el.classList.remove("active");
         if(el.getAttribute("date-color") === mainColor) {
             el.classList.add("active");
         }
     });
     
}
list.forEach(function (el) {
    el.addEventListener("click", function(e) {
    document.documentElement.style.setProperty('--main-color' ,e.target.getAttribute("date-color") );
        active(e);
        window.localStorage.setItem("color" , e.target.getAttribute("date-color"));
    });
});



//change background options
let counter;
let option = true;
let span = document.querySelectorAll(".random-background span");
if(window.localStorage.getItem("option") !==null) {
     span.forEach( (el) => {
         el.classList.remove("active");
         if(el.getAttribute("date-background") === window.localStorage.getItem("option")) {
             el.classList.add("active");
               if(window.localStorage.getItem("option") === "yes") {
            option = true;
            change();
        }
        else {
            option = false;
            clearInterval(counter);
        }
         }
     });
}
span.forEach( (el) => {
    el.addEventListener("click", function(e) {
        active(e);
        if(e.target.getAttribute("date-background") === "yes") {
            option = true;
            change();
        }
        else {
            option = false;
            clearInterval(counter);
        }
        
        window.localStorage.setItem("option" , e.target.getAttribute("date-background"));
    });
});



//change backgroundImage
if(option === true) change();
let landing = document.querySelector(".landing");
let arr = ["images.jpg","images (1).jpg","images (2).jpg","images (3).jpg","images (4).jpg"];
function change () {
        counter = setInterval(function () {
    let rand = Math.floor(Math.random() * arr.length);
    landing.style.backgroundImage = `url("images/`+arr[rand]+`")`;
   } , 3000);
}



//skills
let section = document.querySelector(".skills");
window.onscroll =  () =>  {
    let skillsOffestTop = section.offsetTop;
    let skillsOffestHeight = section.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;

if(windowScrollTop  > (skillsOffestTop + skillsOffestHeight - windowHeight)) {
 let span = document.querySelectorAll(".skill-box .progress span");
  span.forEach(function(el) {
      el.style.width= el.getAttribute("skill-date");
  })
}
}



//images
let images = document.querySelectorAll(".images img");
images.forEach( (el) => {
    el.addEventListener("click" ,  (e) => {
//        create overly
        let overly= document.createElement("div");
        overly.className = "overly";
        document.body.appendChild(overly);
        //create image box
        let box =document.createElement("div");
        box.className = "image-box";
        document.body.appendChild(box);
        
         if(el.alt !== null) {
            let heading = document.createElement("h3");
            let text = document.createTextNode(el.alt);
            heading.appendChild(text);
            box.appendChild(heading);
        }
        
         let close = document.createElement("span");
        close.className ="close"
        let textSpan = document.createTextNode("X");
        close.appendChild(textSpan);
        box.appendChild(close);
        
        let img = document.createElement("img");
        img.src = el.src;
        box.appendChild(img);
    })
})
document.addEventListener("click" ,  (e) => {
    if(e.target.className=="close") {
        e.target.parentNode.remove();
        document.querySelector(".overly").remove();
    }
})



//scroll to section
let circles = document.querySelectorAll(".nav .circle");
let links = document.querySelectorAll(".links a");



//main functions
function scroll(elements) {
    elements.forEach( (ele) => {
    ele.addEventListener("click" ,  (el) => {
        el.preventDefault();
        document.querySelector(el.target.getAttribute("date")).scrollIntoView({
           behavior: "smooth",
        })  
    })
})
}
scroll(links);
scroll(circles);
function active (el) {
    el.target.parentElement.querySelectorAll(".active").forEach(function( e) {
        e.classList.remove("active");
    })
    el.target.classList.add("active");
}
 
                                                                 

//bullets
let nav = document.querySelector(".nav");
let bullets = document.querySelectorAll(".show span");
if(window.localStorage.show !== null) {
     bullets.forEach(function (e) {
        e.classList.remove("active");
    });
     if( window.localStorage.show === "no") {
            nav.style.display ="none";
          document.querySelector(".no").classList.add("active");
        } else {
             nav.style.display ="block";
            document.querySelector(".yes").classList.add("active");
        }
   
}
bullets.forEach(function (bullet) {
    bullet.addEventListener("click" , function (e) {
        active(e);
        if( e.target.getAttribute("date-show") === "no") {
            nav.style.display ="none";
        } else {
             nav.style.display ="block";
        }
        window.localStorage.setItem("show" , e.target.getAttribute("date-show"));
    })
})



//reset options
let button=document.querySelector(".reset");
button.onclick = function () {
    window.localStorage.clear();
    window.location.reload();
}



//links
let but = document.querySelector(".header-container button");
let lin = document.querySelector(".header-container .links");
but.onclick = function (el) {
    el.stopPropagation();
    this.classList.add("menu-active");
    lin.classList.add("open");
}
document.addEventListener("click" , function (el) {
    if(el.target !== but && el.target !== lin) {
        if(lin.classList.contains("open")) {
            lin.classList.remove("open");
            but.classList.remove("menu-active");
        }
    }
})
lin.onclick = function (el) {
    el.stopPropagation();
}