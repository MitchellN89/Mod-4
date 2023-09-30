const btnArray = document.querySelector("#btn_array");

function addCard(title, content) {
  // EXERCISE 1 - Have changed this function to allow args to be passed in
  const template = document
    .getElementById("card-template")
    .content.cloneNode(true);
  template.querySelector(".card-title").innerText = title;
  template.querySelector(".card-text").innerText = content;
  document.querySelector("#card-list").appendChild(template);
}

const data = [
  { name: "bob", age: 23 },
  { name: "alice", age: 39 },
];

// EXERCISE 2 - I have just run this immediately without putting it in a function and calling it
data.forEach((card) => {
  addCard(`Name: ${card.name}`, `Age: ${card.age}`);
});

// EXERCISE 3
const artist = {
  name: "Van Gogh",
  portfolio: [
    {
      title: "portrait",
      url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/436532/1671316/main-image",
    },
    {
      title: "sky",
      url: "https://mymodernmet.com/wp/wp-content/uploads/2020/11/White-house-night-van-goh-worldwide-2.jpg",
    },
  ],
};

const artistArr = [
  artist,
  {
    name: "Da Vinci",
    portfolio: [
      {
        title: "The Last Supper",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
      },
      {
        title: "Mona Lisa",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
      },
      {
        title: "Vitruvian Man",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Da_Vinci_Vitruve_Luc_Viatour.jpg/800px-Da_Vinci_Vitruve_Luc_Viatour.jpg",
      },
    ],
  },
];

function addArtistCard(artist) {
  const newArtist = document
    .querySelector("#artist-card-template")
    .content.cloneNode(true);

  console.log(newArtist);
  const portfolio = newArtist.querySelector(".artist-portfolio");

  newArtist.querySelector(".artist-name").innerHTML = artist.name;

  artist.portfolio.forEach((entry) => {
    const newArtistPortolioEntry = document
      .querySelector("#artist-portfolio-entry-template")
      .content.cloneNode(true);
    newArtistPortolioEntry.querySelector(".artist-portfolio-title").innerHTML =
      entry.title;
    newArtistPortolioEntry.querySelector(".artist-portfolio-img").src =
      entry.url;
    entry.url;
    portfolio.appendChild(newArtistPortolioEntry);
  });

  document.querySelector("#card-list").appendChild(newArtist);
}

artistArr.forEach((artist) => {
  addArtistCard(artist);
});
