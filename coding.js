const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 5,
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1580: {
      slidesPerView: 5,
    },
    1280: {
      slidesPerView: 4,
    },
    960: {
      slidesPerView: 3,
    },
    630: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
    },
  },
});

const swipertwo = new Swiper(".swiper-reviews", {
  // Optional parameters
  slidesPerView: 1,
  loop: true,

  autoplay: {
    delay: 1,
    disableOnInteraction: true,
  },

  pagination: {
    el: ".swiper-pagination",
  },

  speed: 1500,
  breakpoints: {
    1800: {
      slidesPerView: 4,
    },
    1400: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 2,
    },
    630: {
      slidesPerView: 1,
    },
  },
});

const swipertree = new Swiper(".swiper-photo", {
  // Optional parameters
  direction: "horizontal",
  slidesPerView: 1,
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },
});
function myFunction(x) {
  const $box = document.querySelector(".header-container__catalog");
  if (x.matches) {
    // If media query matches
    $box.innerText = "";
  } else {
    $box.innerText = "Каталог";
  }
}

const x = window.matchMedia("(max-width: 1023px)");
myFunction(x); // Call listener function at run time
x.addListener(myFunction); // Attach listener function on state changes

// Получаем элементы слайдера
const slider = document.querySelector(".slider");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const slides = Array.from(slider.querySelectorAll("img"));
const slideCount = slides.length;
let slideIndex = 0;

// Устанавливаем обработчики событий для кнопок
prevButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);

// Функция для показа предыдущего слайда
function showPreviousSlide() {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  updateSlider();
}

// Функция для показа следующего слайда
function showNextSlide() {
  slideIndex = (slideIndex + 1) % slideCount;
  updateSlider();
}

// Функция для обновления отображения слайдера
function updateSlider() {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = "block";
    } else {
      slide.style.display = "none";
    }
  });
}

// Инициализация слайдера
updateSlider();

const catalogButton = document.querySelector(".header-container__catalog");
const catalogModal = document.querySelector("#catalog-modal");
const closeModalButton = document.querySelector("#close-catalog-modal");

let isModalOpen = false;

catalogButton.addEventListener("click", () => {
  toggleModal();
});

closeModalButton.addEventListener("click", () => {
  toggleModal();
});

$(document).click(function (e) {
  if ($(e.target).is(".modal")) {
    toggleModal();
  }
});

function toggleModal() {
  if (isModalOpen) {
    catalogModal.style.display = "none";
    isModalOpen = false;
  } else {
    catalogModal.style.display = "block";
    isModalOpen = true;
  }
}
