//append results to html
const appendGifs = (gifs) => {
  $('#results').empty();
  for (const gif of gifs) {
    $('#results').append(
      `<div class="box"><iframe src="${gif}" frameborder="0"></iframe>
      <button data-id="${gif}" class="add-btn">Add To Favorites</button></div>`
    );
  }
};


//storing data from api
const getGiphs = (data) => {
  let embedURLs = [];
  data.data.map((item) => embedURLs.push(item.embed_url));
  appendGifs(embedURLs);
};


//api call by search value
const searchGifs = () => {
  const input = $('#search-input').val();
  $.ajax({
    method: 'GET',
    url: `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=Fn5QOqtUhDGf396DjM5Zg5Vd8ZeOWssy&limit=10`,
    success: getGiphs,
    error: function (xhr, text, error) {
      console.log(text);
    },
  });
};

//favorites handling
let favoriteGifs = [];

const addToFavorites = function () {
  favoriteGifs.push($(this).data().id);
};

const renderFavorites = function () {
  $('#results').empty();
  $('#favorites-header').empty();
  $('#favorites-header').append(`<h1>Favorites</h1>`);
  for (const favorite of favoriteGifs) {
    $('#results').append(
      `<div class="box"><iframe src="${favorite}" frameborder="0"></iframe>`
    );
  }
};

//buttons handling
$('#search-btn').on('click', searchGifs);

$('#results').on('click', '.add-btn', addToFavorites);

$('#favorites').on('click', renderFavorites);
