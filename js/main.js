"use strict";
//////GLOBAL CONST//////////////////////////////////////////////////////////////////////////////

const buttonSearch = document.querySelector(".js-button");
const sectionArticles = document.querySelector(".js-containers");
const sectionFavorites = document.querySelector(".js-favorites-list");
//console.log(sectionArticles);
let series = [];
const url = "http://api.tvmaze.com/search/shows?q=";

//////PAINT////////////////////////////////////////////////////////////////////////////////////

function paintArticleHtml(nameSerie, imgUrlSerie, idSerie) {
  let article = `<article id = ${idSerie} class="palette-item js-containers-item">
      <img src="${imgUrlSerie}" alt="serie" />
      <h3>${nameSerie}</h3>
  </article>`;

  return article;
}

//////FETCH////////////////////////////////////////////////////////////////////////////////////

function handlerGetData(ev) {
  ev.preventDefault();
  let inputValue = document.querySelector(".js-input").value;

  fetch(url + inputValue)
    .then((response) => response.json())

    .then((globalSeries) => {
      //console.log(series);
      series = globalSeries;
      sectionArticles.innerHTML = "";
      for (const itemSerie of series) {
        //console.log(itemSerie);
        const imageDefault =
          "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
        let nameSerie = itemSerie.show.name;
        let imgUrlSerie =
          itemSerie.show.image != null
            ? itemSerie.show.image.medium
            : imageDefault;
        /*if (itemSerie.show.image != null) {
          imgUrlSerie = itemSerie.show.image.medium;
        } else {
          imgUrlSerie = imageDefault;
        }*/
        let idSerie = itemSerie.show.id;
        let articleResult = paintArticleHtml(nameSerie, imgUrlSerie, idSerie);
        sectionArticles.innerHTML += articleResult;
        console.log(articleResult);
      }

      addListenerSeries();
    });
}

buttonSearch.addEventListener("click", handlerGetData);

//////FAVOURITES///////////////////////////////////////////////////////////////////////////////

function addListenerSeries() {
  const allSeries = document.querySelectorAll(".js-containers-item");
  console.log(allSeries);
  for (const favourite of allSeries) {
    //favourite.classList.remove("favorite"); (lo pondría si le doy clase favorite al <article>)
    favourite.addEventListener("click", handlerPutFavourite);
  }
}

function handlerPutFavourite(event) {
  //console.log(event.currentTarget);
  const clickSerie = event.currentTarget;
  //console.log(clickSerie);
  clickSerie.classList.toggle("favorite");
  //clickSerie.classList.toggle("palette-serie-title-favourite");
}
/*
let favoriteSeries = [];

function paintFavoriteList() {
  const clickFavorite = 
  let favorite = `<li> </li>`
}*/
