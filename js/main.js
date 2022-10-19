///////////////////// Check if there is local storage color option
let mainColors = localStorage.getItem("color_option");
// the deafult is nul so if it is not null 
if (mainColors !== null) {
    // we will set the color on local storage
    document.documentElement.style.setProperty('--main-color', mainColors);

    // Check for active calss bcs there is class active in html and can't remove it bcs it is the deafult
    //Remove active calss from all colors list item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // Add active class on element with data-color === local strage item
        if (element.dataset.color === mainColors) {
            //add active class
            element.classList.add("active");
        }
    });
}


//Random background option
let backgroundOption = true;
//Variable to control the background interval
let backgroundInterval;


//////////////////Check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
//chck if random background local storage is not empty
if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === "true") {
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }
    //remove ative class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

//////////////////open and close settigns box
let settingBtn = document.querySelector(".settings-box .gear");
let settingBox = document.querySelector(".settings-box ");
// open, close and gear spin function
settingBtn.onclick = function () {
    settingBtn.classList.toggle("fa-spin"); //to make gear spin
    settingBox.classList.toggle("open"); //to open setting box
};

/////////////////Switch colors in settings box
const colorsLi = document.querySelectorAll(".colors-list li");
//this loop in all li's
colorsLi.forEach(li => { 
    //when click there is event will happen
    li.addEventListener("click", (e) => { 
        /*
        console.log(e.target.dataset.color); 
        event when i click on any color get me the data set 
        and put it on console
        */
        //Set color on Root 
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //Set color on local storage
        localStorage.setItem("color_option", e.target.dataset.color);
        //Remove active calss from all chilldens
        e.target.parentElement.querySelectorAll(".active").forEach(element => { //the one that i will target it his parent and choose all class="active" in that parent 
            element.classList.remove("active"); //remove it from every element
        });
        //Add active class on target one
        e.target.classList.add("active");
    });
});

/////////////////Switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
//this loop in all spans
randomBackEl.forEach(span => { 
    //when click there is event will happen
    span.addEventListener("click", (e) => { 
        //Remove active calss from all chilldens
        e.target.parentElement.querySelectorAll(".active").forEach(element => { //the one that i will target it his parent and choose all class="active" in that parent 
            element.classList.remove("active"); //remove it from every element
        });
        //Add active class on target one
        e.target.classList.add("active");

        // if press yes random background turn on ,if press no turn off
        if (e.target.dataset.backgrounds === "yes") {
            // that if the one that make interval work
            backgroundOption = true;
            // run the function
            ranomizeImgs();
            // put it in localstorage
            localStorage.setItem("background_option", true);

        }else{
            // to stop the interval
            backgroundOption = false;
            // should make clearIterval too to stop it
            clearInterval(backgroundInterval);
            // put it in localstorage
            localStorage.setItem("background_option", false);
        }
    });
});



///////////////// change landing page images
let landingPage = document.querySelector(".landing-page");
//Get Array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

//Function to randomize Imgs
function ranomizeImgs() {
    if (backgroundOption === true) {

        //every specific time get random number from 0 to 4 from array lenght then put it into page
        backgroundInterval = setInterval(() => {
            //Get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //change background image url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 1000);

    }else {
        // backgroundOption = false;
        // clearInterval(backgroundInterval);
    }
}

ranomizeImgs();


////////////////////progress bar in our skills
let progressSpans = document.querySelectorAll(".skill-progress span");
let section = document.querySelector(".skills");

window.onscroll = function () {
    if (window.scrollY >= section.offsetTop - 300) {
        progressSpans.forEach((span) => {
            span.style.width = span.dataset.progress;
        });
    }
};


////////////////////Create popup eith the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {

        //create overlay element
        let overlay = document.createElement("div");
        //add class to overlay
        overlay.className = 'popup-overlay';
        //append overlay to the body
        document.body.appendChild(overlay);

        //create the popup box
        let popupBox = document.createElement("div");
        //add class to popup box
        popupBox.className = 'popup-Box';

        //if there is alt text we will show it
        if (img.alt !== null) {
            //Create heading
            let imgHeading = document.createElement("h3");
            //create text for heading
            let imgText = document.createTextNode(img.alt);
            //append the text to heading
            imgHeading.appendChild(imgText);
            //append the heading to popup box
            popupBox.appendChild(imgHeading);
        }

        //create the image
        let popupImg = document.createElement("img");
        // set img source
        popupImg.src = img.src;
        //add img to popup box
        popupBox.appendChild(popupImg);

        //append the popup box to body
        document.body.appendChild(popupBox);

        //create the close span
        let closeBtn = document.createElement("span");
        //create th close btn text
        let closeBtnText = document.createTextNode("X");
        //append text to close btn
        closeBtn.appendChild(closeBtnText);
        //add class to close btn
        closeBtn.className = "close-btn";
        //add close btn to the popup box
        popupBox.appendChild(closeBtn);
    });
});
//close popup
document.addEventListener("click", function (e) {
    if (e.target.className == "close-btn") {
        //remove the current popup
        e.target.parentNode.remove();
        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});


//////////////////////make the bulltes go to its section
//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//loop on all bullets
allBullets.forEach(bullet => {
    //when click on ant bullet
    bullet.addEventListener("click", (e) => {
        //get its dataset and go to it
        document.querySelector(e.target.dataset.section).scrollIntoView({
            //to go smoothly
            behavior: 'smooth'
        });
    });
});


//////////////////////make the links go to its section
//select all links a
const allLinks= document.querySelectorAll(".links a");
//loop on all a
allLinks.forEach(link => {
    //when click on ant a
    link.addEventListener("click", (e) => {
        //to disable the links 
        e.preventDefault()
        //get its dataset and go to it
        document.querySelector(e.target.dataset.section).scrollIntoView({
            //to go smoothly
            behavior: 'smooth'
        });
    });
});


/*
[1]you can make function do that loop above to use it in links and bullets: if u will use it u must clear the code from above

function scrollToSomewhere(elements) {
    elements.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });
    });
};
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);



[2]you can make function remove active class and add it to use it in switch colors and random backgrounds: if u will use it u must clear the code from above

function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

*/


//////remove and add active class function
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}


/////////////////show and hide bullets sectionn in option
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

//make sure that there is something in local storage
if (bulletLocalItem !== null) {
    //loop in spnas to remove active class
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    //if block show bullets and add class active to yes btn
    if (bulletLocalItem == 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    //else hide bullets and add class active to no btn
    }else {
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}
//show and hide bullets
bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display == 'show') {
            bulletsContainer.style.display = 'block';
            //to set the value in local storage
            localStorage.setItem("bullets_option", 'block');
        }else{
            bulletsContainer.style.display = 'none';
            //to set the value in local storage
            localStorage.setItem("bullets_option", 'none');
        }
        handleActive(e);
    });
});


///////////////Reset btn options
document.querySelector(".reset-options").onclick = function () {
    //remove these things of local storage
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    //then we reload the page
    window.location.reload();
};


/*
    - there is another way to remove from local storage
    localStorage.clear();
    but it removes every thing. there could be something i use in page else options
    so in case we used that apove way
 */


///////////////////toggle menu header
let toggleBtn = document.querySelector(".toggle-menu"),
    tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    //stop propagation: when i click in btn there is span and there is space, so i can click span or the space. so that propagation stop that shit
    e.stopPropagation();
    //show the little arrow
    this.classList.toggle("menu-active");
    //show the links
    tLinks.classList.toggle("open");
};

//click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
    //this function makes me click anywhere and tell me what did i click if i wrote console.log(e.target)
    if (e.target !== toggleBtn && e.target !== tLinks) {
        //check if menu is open
        if (tLinks.classList.contains("open")) {
            //show the little arrow
            toggleBtn.classList.toggle("menu-active");
            //show the links
            tLinks.classList.toggle("open");
        }
    }
});

//stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
}