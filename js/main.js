"use strict";
const buttonSearch = document.querySelector(".js-button");
const sectionArticles = document.querySelector(".js-containers");

const url = "http://api.tvmaze.com/search/shows?q=";

function paintArticleHtml(nameSerie, imgUrlSerie) {
  let article = `<div class="palette-serie">
      <img src="${imgUrlSerie}" alt="serie" />
      <h3>${nameSerie}</h3>
  </div>`;
  return article;
}

function handlerGetData(ev) {
  ev.preventDefault();
  let inputValue = document.querySelector(".js-input").value;
  const imageDefault =
    "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

  fetch(url + inputValue)
    .then((response) => response.json())

    .then((series) => {
      console.log(series);

      for (const itemSerie of series) {
        console.log(itemSerie);
        let nameSerie = itemSerie.show.name;
        let imgUrlSerie = itemSerie.show.image.medium;
        if (imgUrlSerie === "") {
          imgUrlSerie = imageDefault;
        } else {
          imgUrlSerie = itemSerie.show.image.medium;
        }
        /* === ""
            ? imageDefault
            : itemSerie.show.image.medium;*/

        let articleResult = paintArticleHtml(nameSerie, imgUrlSerie);
        sectionArticles.innerHTML += articleResult;
      }
    });
}

buttonSearch.addEventListener("click", handlerGetData);
