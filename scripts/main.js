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
  lazy: {
    loadPrevNext: true,
    loadOnTransitionStart: true,
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
  lazy: {
    loadPrevNext: true,
    loadOnTransitionStart: true,
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

window.addEventListener("DOMContentLoaded", () => {
  getImageNamesInFolder(folderPath)
    .then((imageNames) => {
      galleryNames = imageNames;
      indexOfCurrent = 0;
    })
    .catch((error) => console.error("Error:", error.message));
});

const galleryNextHandler = () => {
  indexOfCurrent = (indexOfCurrent + 1) % galleryNames.length;
  viewerEl.src = galleryNames[indexOfCurrent];
};

const galleryPrevHandler = () => {
  indexOfCurrent =
    (indexOfCurrent - 1 + galleryNames.length) % galleryNames.length;
  viewerEl.src = galleryNames[indexOfCurrent];
};

const fields = ["name", "number", "email", "message"];
const directions = ["T", "R", "B", "L"];

fields.forEach((field) => {
  const input = document.getElementById(field);
  const inputDirections = directions.map((dir) =>
    document.getElementById(`${field}Input${dir}`)
  );

  const addOrRemoveClass = (method) => {
    inputDirections.forEach((inputDir) => {
      if (inputDir.id.includes("InputT") || inputDir.id.includes("InputB")) {
        inputDir.classList[method]("wFill");
      }
      if (inputDir.id.includes("InputR") || inputDir.id.includes("InputL")) {
        inputDir.classList[method]("hFill");
      }
    });
  };

  input.addEventListener("focus", () => addOrRemoveClass("add"));
  input.addEventListener("blur", () => addOrRemoveClass("remove"));
});

