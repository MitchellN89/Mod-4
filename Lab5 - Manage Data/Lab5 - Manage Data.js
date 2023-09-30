const cardList = document.querySelector("#article-list");
const formNewArticle = document.querySelector("form");

const errorModal = new bootstrap.Modal(document.getElementById("error-modal"));

let news = [
  { id: 1, title: "Election Results", content: "Newly elected minister..." },
  { id: 2, title: "Sporting Success", content: "World Cup winners..." },
  { id: 3, title: "Tornado Warning", content: "Residents should prepare..." },
];

formNewArticle.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.querySelector("#input-title"),
    content = document.querySelector("#input-content");

  function clearForm() {
    title.value = "";
    content.value = "";
    title.focus();
  }

  if (title.value && content.value) {
    function getNewId() {
      let highestNum = 0;
      for (let i = 0; i < news.length; i++) {
        if (news[i].id > highestNum) {
          highestNum = news[i].id + 1;
        }
      }
      return highestNum;
    }

    news.unshift({
      id: getNewId(),
      title: title.value,
      content: content.value,
    });
  } else {
    errorModal.show();
  }
  clearForm();
});

function populateNewsFeed() {
  cardList.innerHTML = "";
  news.forEach((aritcle) => {
    const newArticle = document
      .querySelector("#card-template")
      .content.cloneNode(true);
    newArticle.querySelector(".card-title").innerHTML = aritcle.title;
    newArticle.querySelector(".card-content").innerHTML = aritcle.content;
    newArticle.querySelector(".card").id = `article-${aritcle.id}`;
    cardList.appendChild(newArticle);
  });
}

populateNewsFeed(); // run once
setInterval(populateNewsFeed, 5000); // and run every 5 seconds
