// variables for the event listeners and DOM interaction
const btnAllItems = document.querySelector("#category-all-items");
const inputSearch = document.querySelector("#input-search");
const btnSearch = document.querySelector("#btn-search");

// function that lets me pass in a prefix and a search criteria
async function getData(searchCriteria = "", prefix = "") {
  return await fetch(
    `https://fakestoreapi.com/products/${prefix}${searchCriteria}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    });
}

//  this does an api call to get all items in all categories and display them
btnAllItems.addEventListener("click", () => {
  getData("", "").then((data) => {
    renderProducts(data, "All Items");
  });
});

// this is a search feature. if I were to redo this, I would probably have all the data stored in a cache and use that instead of making API calls each time.
// but i figured this is a good demonstration of using API calls.
btnSearch.addEventListener("click", (evt) => {
  evt.preventDefault();
  const searchValue = inputSearch.value;
  if (searchValue !== "") {
    getData().then((products) => {
      renderProducts(
        products.filter((product) => {
          return product.title
            .toUpperCase()
            .includes(searchValue.toUpperCase());
        }),
        `Search: ${inputSearch.value}`
      );
      inputSearch.value = "";
    });
  }
});

// I've opted to get the API to populate the categories dropdown instead of hardcoding each name into the list/
// I figure, if the database changed, you wouldn't want to have to keep changing the html and JS to suit.

getData("categories", "").then((categories) => {
  // get the categories
  const categoryList = document.querySelector("#category-list"); // make a variable out of the dropdown list
  categories.forEach((category) => {
    //iterate over the categories
    const newCategory = document // clone the template
      .querySelector("#category-template")
      .content.cloneNode(true);

    newCategory.querySelector("a").innerHTML = formatName(category); // update the anchor tag to have the name of the category, but clean it up first...

    const anchorTag = newCategory.querySelector("a"); // store the anchor tag in a variable

    anchorTag.addEventListener("click", () => {
      // make sure when the anchor tag is clicked, it does an API call with the category passed in to return only items from that category
      getData(category, "category/").then((data) => {
        renderProducts(data, category);
      });
    });

    categoryList.appendChild(newCategory); // update the cards
  });
});

// a function that requires an array and a title (or header) to be passed in. this puts the cards on the screen
function renderProducts(products, header) {
  const cardContainer = document.querySelector("#card-container");
  const categoryTitle = document.querySelector("#category-title");
  categoryTitle.innerHTML = formatName(header);
  clear();
  products.forEach((product) => {
    const newProduct = document
      .querySelector("#card-template")
      .content.cloneNode(true);

    newProduct.querySelector("img").src = product.image;
    newProduct.querySelector(".card-title").innerHTML = product.title;
    newProduct.querySelector(".card-content").innerHTML = truncate(
      product.description,
      100
    );
    newProduct.querySelector("#card-price").innerHTML =
      "Price: $" + product.price.toFixed(2);
    newProduct.querySelector("#card-category").innerHTML =
      "Category: " + product.category;

    cardContainer.appendChild(newProduct);
  });
}

function truncate(str, limit) {
  // the cards get a little messy with too much text. have made this to shorten them down
  if (str.length > limit) {
    return str.slice(0, limit) + "...";
  }
  return str;
}

function clear() {
  const cardContainer = document.querySelector("#card-container");
  cardContainer.innerHTML = "";
}

function formatName(str) {
  const arr = str.split(" ");
  return arr
    .map((word) => {
      return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
    })
    .join(" ");
}

getData().then((data) => {
  // load all the data for when the page is loaded
  renderProducts(data, "All Items");
});

// Overall, happy with this. The only thing i might change (as mentioned earlier), is storing the data somewhere after the first initial API and manipulating it from there
