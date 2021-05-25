"use strict";
//////GLOBAL CONSTANTS//////////////////////////////////////////////////////////////////////////////

let series = [];
let favoriteSeries = [];

const buttonSearch = document.querySelector(".js-button");
const sectionArticles = document.querySelector(".js-containers");
const sectionFavorites = document.querySelector(".js-favorites-list");

const url = "//api.tvmaze.com/search/shows?q=";
const imageDefault =
  "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";

//////FETCH////////////////////////////////////////////////////////////////////////////////////////

function handlerGetData(ev) {
  ev.preventDefault();
  let inputValue = document.querySelector(".js-input").value;

  fetch(url + inputValue)
    .then((response) => response.json())
    .then((allSeries) => {
      series = allSeries;

      paintArticlesFetch();
    });
}

buttonSearch.addEventListener("click", handlerGetData);

//////PAINTING/////////////////////////////////////////////////////////////////////////////

function paintArticlesFetch() {
  sectionArticles.innerHTML = "";
  for (const itemSerie of series) {
    let nameSerie = itemSerie.show.name;
    let imgUrlSerie =
      itemSerie.show.image !== null
        ? itemSerie.show.image.medium
        : imageDefault;
    /*if (itemSerie.show.image !== null) {
      imgUrlSerie = itemSerie.show.image.medium;
    } else {
      imgUrlSerie = imageDefault;
    }*/
    let idSerie = itemSerie.show.id;
    let articleResult = paintArticleHtml(nameSerie, imgUrlSerie, idSerie);
    sectionArticles.innerHTML += articleResult;
  }

  addListenerSeries();
}

function paintArticleHtml(nameSerie, imgUrlSerie, idSerie) {
  //busco si el artículo que se está pintando, está en favoritos:
  const exist = favoriteSeries.find((favorite) => {
    return favorite.show.id === idSerie;
  });
  let classFavorite = "";
  if (exist === undefined) {
    classFavorite = "";
  } else {
    classFavorite = "favorite";
  }
  let article = `<article data-id = ${idSerie} class="palette-item js-containers-item ${classFavorite}">
  <img src="${imgUrlSerie}" alt="serie" />
  <h3 class="palette-item-name">${nameSerie}</h3>
  </article>`;

  return article;
}

function paintListFavorite(nameSerie, imgUrlSerie, idSerie) {
  let articleFavorite = `<li class="favorite-list" data-id=${idSerie} "><img src="${imgUrlSerie}" width="75px"/><p class="favorite-list-name">${nameSerie}</p></li>`;

  return articleFavorite;
}

function paintFavorites(favoriteSeries) {
  sectionFavorites.innerHTML = "";
  for (const serie of favoriteSeries) {
    let imgSerieFav =
      serie.show.image !== null ? serie.show.image.medium : imageDefault;
    let articleFavorite = paintListFavorite(
      serie.show.name,
      imgSerieFav,
      serie.show.id
    );
    sectionFavorites.innerHTML += articleFavorite;
  }
}

//////FAVORITES/////////////////////////////////////////////////////////////////////////////////////

function addListenerSeries() {
  const allSeries = document.querySelectorAll(".js-containers-item");

  for (const favorite of allSeries) {
    //favourite.classList.remove("favorite"); (lo pondría si le doy clase favorite al <article>)
    favorite.addEventListener("click", handlerPutFavourite);
  }
}

function handlerPutFavourite(event) {
  //identifico el artículo pulsado:
  const clickSerie = event.currentTarget;
  //clickSerie.classList.toggle("favorite");

  //obtengo el id asociado al artículo:
  const idSerie = parseInt(clickSerie.dataset.id);

  //busco si el artículo clickado está en favoritos:
  const exist = favoriteSeries.find((favorite) => {
    return favorite.show.id === idSerie;
  });
  //si el objeto con id de la paleta en la que he hecho click no está en el array de favoritos:
  if (exist === undefined) {
    const clickedSerie = series.find((serie) => {
      return serie.show.id === idSerie;
    });
    favoriteSeries.push(clickedSerie);

    //si el objeto con id de la paleta en la que he hecho click está en el array de favoritos:
  } else {
    const clickedSerie = series.find((serie) => {
      return serie.show.id === idSerie;
    });
    //let position = favoriteSeries.indexOf(clickedSerie);
    //favoriteSeries = favoriteSeries.splice(position, 1);
    favoriteSeries = deleteFavorite(favoriteSeries, clickedSerie);
  }

  localStorage.setItem("FAVORITE_SERIES", JSON.stringify(favoriteSeries));

  // pintame los favoritos:
  paintArticlesFetch();

  // guardalo en el local storage:
  paintFavoriteFromLocalStorage();
}

function deleteFavorite(favoriteSeries, clickedSerie) {
  return favoriteSeries.filter(
    (elementFavorite) => elementFavorite.show.id !== clickedSerie.show.id
  );
}

//////LOCAL STORAGE/////////////////////////////////////////////////////////////////////////////////

function paintFavoriteFromLocalStorage() {
  if (localStorage.getItem("FAVORITE_SERIES") === null) {
    return;
  } else {
    const seriesFavLocalStorage = JSON.parse(
      localStorage.getItem("FAVORITE_SERIES")
    );
    paintFavorites(seriesFavLocalStorage);
  }
}

document.addEventListener("DOMContentLoaded", paintFavoriteFromLocalStorage);
