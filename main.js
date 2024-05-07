async function getResponse(link, selector, selector_weba) {
  const urls = [
    "http://localhost:3000/products",
    "http://localhost:3000/recomendet-product",
  ];
  const selectors = [".new", ".rec"];
  const selector_web = ["recomendation", "promotion"];
  const index = urls.indexOf(link);
  if (index === -1) {
    return;
  }
  const web = selector_weba;
  // const web = selector_web[index];
  const response = await fetch(link);
  if (!response.ok) {
    console.error("Failed to fetch");
    return;
  }
  const content = await response.json();
  const list = document.querySelector(selector || selectors[index]);
  if (!list) {
    return;
  }

  // Проверяем, есть ли у элемента в свойстве oldPrice. Если есть, присваиваем его значение переменной hasOldPrice, иначе присваиваем undefined.
  // const hasOldPrice = "oldPrice" in item ? item.oldPrice : "";
  let html = "";

  content.forEach((item) => {
    html += `<div class="swiper-slide" data-id="${
      item.id
    }" style=width:300px role="group">
    <div class="product-${web}__product product product-menu"
                >
      <img class="product-${web}__product__product-img product__img" style='object-fit: cover' src= "${
      item.url
    }"/></div> 
      <div class="product-${web}__product__product-info">
        <div class="product-${web}__product__product-info__price product__info__price product__info" id="">
        ${
          "old_price" in item
            ? `<div
          class="product-${web}__product__product-info__price__new-price product__info new-price"
          id=""
        >
          ${item.price}
        </div>`
            : `<div
          class="product-${web}__product__product-info__price__new-price product__info"
          id=""
        >
          ${item.price}
        </div>`
        }
      <div
        class="product-${web}__product__product-info__price__old-price product__info old-price"
        id="">${(hasOldPrice =
          "old_price" in item ? item.old_price : "")} </div>
        </div>
        <div class="product-${web}__product__product-info__name product__info__name" id="">${
      item.title
    }</div></div></div></div>`;
  });

  list.innerHTML += html;
}

const MAX_OBJECTS = 20; // Максимальное количество создаваемых объектов
let createdObjectsCount = 0; // Количество уже созданных объектов

async function createObject() {
  if (createdObjectsCount >= MAX_OBJECTS) {
    console.log(`Созданно максимальное количество объектов: ${MAX_OBJECTS}`);
    return;
  }
  createdObjectsCount++;
  console.log(`Создан объект номер ${createdObjectsCount}`);
  // Ваш код для создания объекта
}

async function run() {
  const urls = [
    "http://localhost:3000/products",
    "http://localhost:3000/recomendet-product",
    "http://localhost:3000/reviews",
    "http://localhost:3000/basket",
  ];
  const selectors = [".new", ".rec", ".rew", ".bas", ".flex-row"];
  const selector_web = [
    "history",
    "recomendation",
    "reviews",
    "main-container__basket",
    "product",
  ];

  await getResponse(urls[0], selectors[0], selector_web[0]);
  await getResponse(urls[1], selectors[1], selector_web[1]);

  const isIndexPage = location.pathname === "/index2.html";
  if (isIndexPage) {
    await getResponseindex2(urls[2], selectors[2], selector_web[2]);
  }
  const isIndexPaget = location.pathname === "/index3.html";
  if (isIndexPaget) {
    await getResponseindex3(urls[3], selectors[3], selector_web[3]);
  }
  const isIndexcatal = location.pathname === "/index5.html";
  if (isIndexcatal) {
    await getResponseindex4(urls[0], selectors[4], selector_web[4]);
    await getResponseindex4(urls[1], selectors[4], selector_web[4]);
  }
}
async function getResponseindex2(url, selector, selector_weba) {
  const response = await fetch(url);
  const reviews = await response.json();
  const web = selector_weba;
  // Проверяем, есть ли у элемента в свойстве oldPrice. Если есть, присваиваем его значение переменной hasOldPrice, иначе присваиваем undefined.
  // const hasOldPrice = "oldPrice" in item ? item.oldPrice : "";
  let html = "";
  const list = document.querySelector(selector);
  if (!list) {
    return;
  }
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id");

  // Filter reviews based on productId matching the id in the URL
  const filteredReviews = reviews.filter(
    (review) => review.productId === parseInt(idParam)
  );

  filteredReviews.forEach((item) => {
    html +=
      ` <div class="product-${web}__user-container__user-review">
    <div class="product-${web}__user-container__user-review__avatar">
  <img src= "${item.avatar}" class="product-${web}__user-container__user-review__avatar__image"/>
  </div>
  <div
  class="product-${web}__user-container__user-review__user-info"
>
<div
                class="product-${web}__user-container__user-review__user-info__container"
              >
                <div
                  class="product-${web}__user-container__user-review__user-info__container__name-and-date"
                >
                  <div
                    class="product-${web}__user-container__user-review__user-info__container__name-and-date__name"
                  >
                    ${item.author}
                  </div>
                  <div
                    class="product-${web}__user-container__user-review__user-info__container__name-and-date__date"
                  >
                  ${item.date}
                  </div>
                </div>

                <div
                  class="product-${web}__user-container__user-review__user-info__container__star"
                >` +
      [...Array(item.rating).keys()]
        .map(() => `<img id="star" src="./icons/star.svg"/>`)
        .join("") +
      `</div>
      </div>
              <div class="product-${web}__user-container__user-review__text">
                ${item.comment}
              </div>
              <div class="product-${web}__user-container__user-review__grade">
                <div
                  class="product-${web}__user-container__user-review__grade__like"
                >
                  <img src="./icons/like.svg" />
                  <span id="like">${item.likes}</span>
                </div>
                <div
                  class="product-${web}__user-container__user-review__grade__dislike"
                >
                  <img src="./icons/dislike.svg" />
                  <span id="dislike">${item.dislikes}</span>
                </div> </div> </div> </div>
`;
  });

  list.innerHTML += html;
}
async function getResponseindex3(url, selector, selector_weba) {
  const response = await fetch(url);
  const basket = await response.json();
  const web = selector_weba;
  html = "";
  const basketContainer = document.querySelector(".main-container__basket");
  basketContainer.innerHTML = ""; // Clear the previous contents of the basket
  const list = document.querySelector(selector);
  if (!list) {
    return;
  }
  basket.forEach((item) => {
    html += `<div class="${web}__group">
      <div class="${web}__info">
        <div class="${web}__info__img">
          <img
            class="${web}__info__img__photo"
            src="${item.url}"
          />
        </div>
        <div class="${web}__info__name">${item.title}</div>
      </div>

      <div class="${web}__price-group">
        <div class="${web}__price">${item.price} ₽</div>
        <div class="${web}__count-group">
          <button class="${web}__count-group__plus">-</button>
          <div class="${web}__count-group__count">${item.quantity}</div>
          <button class="${web}__count-group__minus">+</button>
        </div>
      </div>
    </div>;`;
  });
  list.innerHTML += html;
}
async function getResponseindex4(url, selector, selector_weba) {
  const response = await fetch(url);
  const catalog = await response.json();
  const web = selector_weba;
  // Проверяем, есть ли у элемента в свойстве oldPrice. Если есть, присваиваем его значение переменной hasOldPrice, иначе присваиваем undefined.
  // const hasOldPrice = "oldPrice" in item ? item.oldPrice : "";
  let html = "";
  const list = document.querySelector(selector);
  if (!list) {
    return;
  }
  catalog.forEach((item) => {
    html += `<div class="${web} menu" data-id="${item.id}">
              <img class="${web}-img" src="./icons/nognersi.png" id="" />
              <div class="${web}-info">
                <div class="${web}__price">

        ${
          "old_price" in item
            ? `<div
          class="${web}__price__regular-price new-price"
          id=""
        >
          ${item.price} ₽
        </div>`
            : `<div
          class="${web}__price__regular-price"
          id=""
        >
          ${item.price} ₽
        </div>`
        }
        <div
        class="${web}__price__old-price"
        id="">${(hasOldPrice =
          "old_price" in item ? `${item.old_price} ₽` : "")} </div>
                </div>
                <div class="${web}__name">${item.title}</div>
                <div class="${web}__star">
                  <img class="${web}__star__img" src="icons/star.svg" />
                  <span>5.0</span>
                </div>
              </div>
              <button class="${web}__button">Купить</button>
            </div>`;
  });
  list.innerHTML += html;
}

run();

// getResponse();
/*
Страница продукта:
Добавь div с id="product-page".
В div с id="product-page" добавь:
  - изображение с классом product-img, в src указать url из json.
  - название продукта с классом product-name, в текст поместить title из json.
  - Если есть old_price, то создать блок с классом product-old-price, в текст поместить old_price из json.
*/

// Страница продукта
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    // Если клик не произошел на свайп-слайде, то возвращаемся.
    if (!event.target.closest(".swiper-slide")) return;
    // Ищем элемент
    const productElement = event.target.closest(".swiper-slide");
    // Получаем id продукта
    const productId = productElement.dataset.id;
    // Перенаправляем на страницу продукта
    window.location.href = `index2.html?id=${productId}`;
  });
});
// const { updateDatabase } = require("./database.js");

// // Use the updateDatabase function to update the database
// updateDatabase(["product1", "product2"]);
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (event) => {
    // Если клик не произошел на свайп-слайде, то возвращаемся.
    if (!event.target.closest(".menu")) return;
    // Ищем элемент
    const productElement = event.target.closest(".menu");
    // Получаем id продукта
    const productId = productElement.dataset.id;
    // Перенаправляем на страницу продукта
    window.location.href = `index2.html?id=${productId}`;
  });
});
