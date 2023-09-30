const form = document.querySelector("#form-method");
const cardContainer = document.querySelector("#card-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let limit = document.querySelector("#input-limit").value;
  if (isNaN(limit) || limit === "") {
    limit = 10;
  }
  clearCardContainer();

  switch (true) {
    case document.querySelector("#input-use-fetch").checked:
      fetchRequest(limit);
      break;
    case document.querySelector("#input-use-axios").checked:
      axiosRequest(limit);
      break;
    case document.querySelector("#input-use-XMLHttpRequest").checked:
      XMLHttpRequestRequest(limit);
      break;
  }
});

function clearCardContainer() {
  cardContainer.innerHTML = "";
  const inputLimit = document.querySelector("#input-limit");
  inputLimit.value = "10";
  inputLimit.focus();
}

function fetchRequest(limit) {
  const suffix = limit ? `?_limit=${parseInt(limit)}` : "";
  fetch(`https://jsonplaceholder.typicode.com/posts${suffix}`)
    .then((response) => response.json())
    .then((json) => populateCards(json));
}

function axiosRequest(limit) {
  const suffix = limit ? `?_limit=${parseInt(limit)}` : "";
  axios
    .get(`https://jsonplaceholder.typicode.com/posts${suffix}`)
    .then((response) => {
      populateCards(response.data);
    });
}

function XMLHttpRequestRequest(limit) {
  const newRequest = new XMLHttpRequest();
  const suffix = limit ? `?_limit=${parseInt(limit)}` : "";
  newRequest.open(
    "GET",
    `https://jsonplaceholder.typicode.com/posts${suffix}`,
    true
  );

  newRequest.onreadystatechange = function () {
    if (newRequest.readyState === 4) {
      if (newRequest.status === 200) {
        const response = newRequest.responseText;
        populateCards(JSON.parse(response));
      }
    }
  };

  newRequest.send();
}

function populateCards(entries) {
  entries.forEach((entry) => {
    const newElement = document
      .querySelector("#card-template")
      .content.cloneNode(true);

    newElement.querySelector(".card-title").innerHTML = entry.title;
    newElement.querySelector(".card-content").innerHTML = entry.body;

    cardContainer.appendChild(newElement);
  });
}
