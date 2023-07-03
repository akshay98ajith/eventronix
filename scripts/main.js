// const end = Date.now() + 15 * 500;

// // go Buckeyes!
// const colors = ["#ef3c47", "#ffffff"];

// (function frame() {
//   confetti({
//     particleCount: 1,
//     angle: 60,
//     spread: 55,
//     origin: { x: 0 },
//     colors: colors,
//   });

//   confetti({
//     particleCount: 1,
//     angle: 120,
//     spread: 55,
//     origin: { x: 1 },
//     colors: colors,
//   });

//   if (Date.now() < end) {
//     requestAnimationFrame(frame);
//   }
// })();

// document.getElementById("run").addEventListener("click", run);

const loader = document.getElementById("loader");
const main = document.documentElement;

function hideLoader(loader, main) {
  if (!loader || !main) return;
  loader.classList.add("vanishClass");
  main.style.overflowY = "auto";
}

function updateSwiper(swiper1, swiper2) {
  if (!swiper1 || !swiper2) return;
  swiper1.update();
  swiper2.update();
}

function removeLoader(loader) {
  if (!loader) return;
  loader.remove();
}

// Function to handle load
function handleLoad() {
  setTimeout(() => hideLoader(loader, main), 300);
  setTimeout(() => updateSwiper(swiper1, swiper2), 300);
  setTimeout(() => removeLoader(loader), 1000);
}

window.addEventListener("load", handleLoad);

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });
  hamburger.classList.toggle("toggle");
});

const removeNav = () => {
  if (window.innerWidth < 800) {
    navLinks.classList.toggle("open");
    links.forEach((link) => {
      link.classList.toggle("fade");
    });
    hamburger.classList.toggle("toggle");
  }
};

var swiper1 = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  coverflowEffect: {
    rotate: 10,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: false,
  },
  navigation: {
    prevEl: ".swiper-button-prev-1",
    nextEl: ".swiper-button-next-1",
  },
  spaceBetween: 60,
  loop: true,
});

var swiper2 = new Swiper(".swiper2", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  coverflowEffect: {
    rotate: 8,
    stretch: 0,
    depth: -50,
    modifier: 2,
    slideShadows: false,
    scale: 1,
  },
  navigation: {
    prevEl: ".swiper-button-prev-2",
    nextEl: ".swiper-button-next-2",
  },
  spaceBetween: 10,
  loop: true,
});

window.addEventListener("DOMContentLoaded", () => {
  swiper1.update();
  swiper2.update();
});

var currentImageName;

var imgWrapper = document.getElementById("imgWrapper");
var viewerEl = document.getElementById("imgView");
const imageViewer = (props) => {
  viewerEl.src = `assets/gallery/${props}.webp`;
  imgWrapper.style.display = "flex";
  currentImageName = `/assets/gallery/${props}.webp`;
  indexOfCurrent = galleryNames.indexOf(`${currentImageName}`);
};

const closeImgViewer = () => {
  imgWrapper.style.display = "none";
};

window.addEventListener("resize", () => {
  swiper1.update();
  swiper2.update();
});

var galleryNames = [];

function getImageNamesInFolder(folderPath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", folderPath);
    xhr.onload = function () {
      if (xhr.status === 200) {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(xhr.responseText, "text/html");
        const imageNames = [];

        const imageElements = htmlDoc.getElementsByTagName("a");
        for (let i = 0; i < imageElements.length; i++) {
          const fileName = imageElements[i].getAttribute("href");
          const extension = fileName.split(".").pop().toLowerCase();
          if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) {
            imageNames.push(fileName);
          }
        }

        resolve(imageNames);
      } else {
        reject(new Error("Failed to retrieve image list from the folder."));
      }
    };
    xhr.onerror = function () {
      reject(new Error("Error retrieving image list from the folder."));
    };
    xhr.send();
  });
}
const folderPath = "assets/gallery/";

getImageNamesInFolder(folderPath)
  .then((imageNames) => {
    galleryNames = imageNames;
    indexOfCurrent = 0;
  })
  .catch((error) => console.error("Error:", error.message));

const galleryNextHandler = () => {
  indexOfCurrent = (indexOfCurrent + 1) % galleryNames.length;
  viewerEl.src = galleryNames[indexOfCurrent];
};

const galleryPrevHandler = () => {
  indexOfCurrent =
    (indexOfCurrent - 1 + galleryNames.length) % galleryNames.length;
  viewerEl.src = galleryNames[indexOfCurrent];
};

const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameInputT = document.getElementById("nameInputT");
const nameInputR = document.getElementById("nameInputR");
const nameInputB = document.getElementById("nameInputB");
const nameInputL = document.getElementById("nameInputL");

const numberInputT = document.getElementById("numberInputT");
const numberInputR = document.getElementById("numberInputR");
const numberInputB = document.getElementById("numberInputB");
const numberInputL = document.getElementById("numberInputL");

const emailInputT = document.getElementById("emailInputT");
const emailInputR = document.getElementById("emailInputR");
const emailInputB = document.getElementById("emailInputB");
const emailInputL = document.getElementById("emailInputL");

const messageInputT = document.getElementById("messageInputT");
const messageInputR = document.getElementById("messageInputR");
const messageInputB = document.getElementById("messageInputB");
const messageInputL = document.getElementById("messageInputL");

nameInput.addEventListener("focus", () => {
  nameInputT.classList.add("wFill");
  nameInputR.classList.add("hFill");
  nameInputB.classList.add("wFill");
  nameInputL.classList.add("hFill");
});
nameInput.addEventListener("blur", () => {
  nameInputT.classList.remove("wFill");
  nameInputR.classList.remove("hFill");
  nameInputB.classList.remove("wFill");
  nameInputL.classList.remove("hFill");
});

numberInput.addEventListener("focus", () => {
  numberInputT.classList.add("wFill");
  numberInputR.classList.add("hFill");
  numberInputB.classList.add("wFill");
  numberInputL.classList.add("hFill");
});
numberInput.addEventListener("blur", () => {
  numberInputT.classList.remove("wFill");
  numberInputR.classList.remove("hFill");
  numberInputB.classList.remove("wFill");
  numberInputL.classList.remove("hFill");
});

emailInput.addEventListener("focus", () => {
  emailInputT.classList.add("wFill");
  emailInputR.classList.add("hFill");
  emailInputB.classList.add("wFill");
  emailInputL.classList.add("hFill");
});
emailInput.addEventListener("blur", () => {
  emailInputT.classList.remove("wFill");
  emailInputR.classList.remove("hFill");
  emailInputB.classList.remove("wFill");
  emailInputL.classList.remove("hFill");
});

messageInput.addEventListener("focus", () => {
  messageInputT.classList.add("wFill");
  messageInputR.classList.add("hFill");
  messageInputB.classList.add("wFill");
  messageInputL.classList.add("hFill");
});
messageInput.addEventListener("blur", () => {
  messageInputT.classList.remove("wFill");
  messageInputR.classList.remove("hFill");
  messageInputB.classList.remove("wFill");
  messageInputL.classList.remove("hFill");
});

