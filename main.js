let favoriteGifs = [];

const searchGiphs = () => {
  $('#results').empty();

  let input = $('#search-input').val();

  const getGiphs = (data) => {
    let embedURLs = [];
    data.data.map((item) => embedURLs.push(item.embed_url));
    console.log(embedURLs);

    for (const item of embedURLs) {
      $('#results').append(
        `<div class="box"><iframe src="${item}" frameborder="0"></iframe>
        <button data-id="${item}" class="add-btn">Add To Favorites</button></div>`
      );
    }
  };

  $.ajax({
    method: 'GET',
    url: `http://api.giphy.com/v1/gifs/search?q=${input}&api_key=Fn5QOqtUhDGf396DjM5Zg5Vd8ZeOWssy&limit=10`,
    success: getGiphs,
    error: function (xhr, text, error) {
      console.log(text);
    },
  });
};

$('#search-btn').on('click', searchGiphs);

$('#results').on('click', '.add-btn', function () {
  favoriteGifs.push($(this).data().id);
});

$('#favorites').on('click', function () {
  $('#results').empty();
  $('#results').append(`<h1>Favorites</h1>`);
  for (const favorite of favoriteGifs) {
    $('#results').append(
      `<div class="box"><iframe src="${favorite}" frameborder="0"></iframe>`
    );
  }
});
