let cart = {
  sils23: {
    name: "blabla",
    count: 3,
  },
  pqmry28: {
    name: "blabla",
    count: 3,
  },
};

document.onclick = (event) => {
  if (event.target.classList.contains("plus")) {
    plusFunction(event.target.dataset.id);
  }
  if (event.target.classList.contains("minus")) {
    minusFunction(event.target.dataset.id);
  }
};
const plusFunction = (id) => {
  cart[id]["count"]++;
  renderCart();
};

// уменьшение количества товара
const minusFunction = (id) => {
  if (cart[id]["count"] - 1 == 0) {
    deleteFunction(id);
    return true;
  }
  cart[id]--;
  renderCart();
};
const deleteFunction = (id) => {
  delete cart[id];
  renderCart();
};

const renderCart = () => {
  console.log(cart);
};
