/*Movie Streaming Platform

You are working on a movie recommendation system.

Test data:
const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];


Tasks:
    1. filter() only "Sci-Fi" movies
    2. map() to return:
            "Inception (8.8)"

    3. reduce() to find average movie rating
    4. find() movie "Joker"
    5. findIndex() of "Avengers"
*/
// Test Data
const movieData = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];

// 1. Sci-Fi movies
const sciFiMovies = movieData.filter(m => m.genre === "Sci-Fi");

// 2. Title with rating
const movieTitles = movieData.map(
  m => `${m.title} (${m.rating})`
);

// 3. Average rating
const avgRating =
  movieData.reduce((sum, m) => sum + m.rating, 0) / movieData.length;

// 4. Find Joker
const jokerMovie = movieData.find(m => m.title === "Joker");

// 5. Index of Avengers
const avengersIndex = movieData.findIndex(m => m.title === "Avengers");

console.log(sciFiMovies);
console.log(movieTitles);
console.log("Average Rating:", avgRating);
console.log("Joker Movie:", jokerMovie);
console.log("Avengers Index:", avengersIndex);


