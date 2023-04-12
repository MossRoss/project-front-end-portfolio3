// _______-----  NEWS APP  ------_________

const api_Key = "cff8779f5593428d81da4ed23066edee";
const container = document.querySelector(".container");
const screen = {
  main: container.querySelector(".main-screen"),
  news: container.querySelector(".news-screen"),
};
const catagories = [
  "general",
  "business",
  "science",
  "health",
  "entertainment",
  "technology",
  "sports",
];
for (let i = 0; i < catagories.length; i++) {
  let card = document.createElement("div");
  card.innerText = catagories[i];
  card.addEventListener("click", () => {
    event.preventDefault();
    screen.main.querySelector(".catagories .active").classList.remove("active");
    card.classList.add("active");
    getCatagoryNews(catagories[i]);
  });

  if (i == 0) {
    card.classList.add("active");
    getCatagoryNews(catagories[i]);
  }
  screen.main.querySelector(".catagories").appendChild(card);
}
async function getCatagoryNews(catagory) {
  const newsList = screen.main.querySelector(".news-list");
  newsList.innerHTML = "";
  let newsAPI = `https://newsapi.org/v2/top-headlines?country=us&category=${catagory}&apiKey=${api_Key}`;

  try {
    const result = await fetch(newsAPI);
    const data = await result.json();
    let news = data.articles;
    //  console.log(news);

    for (let i = 0; i < news.length; i++) {
      let div = document.createElement("div");
      div.classList.add("item");
      console.log(news[i].url);

      // div.addEventListener("click", () => {
      //   event.preventDefault();
      //   showNews(news[i]);
      // });
      div.innerHTML = `
                  <div class="small-img">
                    <img src="${news[i].urlToImage}">
                  </div>
                  <div class="details">
                    <h2>${news[i].title}</h2>
                    <p>${news[i].description}</p>
                    <a href="${news[i].url}" target="_blank"
                    class="view-button">Read More</a>
                  </div>
                  `;
      screen.main.querySelector(".news-list").appendChild(div);
    }
  } catch (error) {
    console.log(error);
    console.log("No news available now. Please try again later.");
  }
}
