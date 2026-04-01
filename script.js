const API_KEY = "a22f14e7"
let movies = [];


async function searchMovies() {
  const query = document.getElementById("searchInput").value;

  if (!query) {
    alert("Enter movie name");
    return;
  }

  try {
    const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    const data = await res.json();

    movies = data.Search || [];
    displayMovies(movies);

  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function displayMovies(movieList) {
  const container = document.getElementById("moviesContainer");
  container.innerHTML = "";

  if (movieList.length === 0) {
    container.innerHTML = "<p>No movies found</p>";
    return;
  }

  movieList.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}" />
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      <p>Type: ${movie.Type}</p>
    `;

    container.appendChild(card);
  });
}

document.getElementById("filterType").addEventListener("change", () => {
  const type = document.getElementById("filterType").value;

  const filtered = movies.filter(movie => {
    return type === "" || movie.Type === type;
  });

  displayMovies(filtered);
});

document.getElementById("sortType").addEventListener("change", () => {
  const sortType = document.getElementById("sortType").value;

  let sorted = [...movies];

  if (sortType === "year") {
    sorted.sort((a, b) => b.Year - a.Year);
  } else if (sortType === "name") {
    sorted.sort((a, b) => a.Title.localeCompare(b.Title));
  }

  displayMovies(sorted);
});