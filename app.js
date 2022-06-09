const imageContainer = document.querySelector(".image-container");
const API_KEY = config.API_KEY;
let dateObj = new Date();

const getTodaysDate = () => {
  dateObj = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - dateObj).toISOString().slice(0, 10);
};

const fetchPicture = async () => {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${getTodaysDate()}`
  );

  const data = await res.json();

  displayPicture(data);
};

fetchPicture();

function displayPicture(data) {
  imageContainer.innerHTML = `
  <img class="image" src=${data.url} alt=${data.media_type} />

  <h2 class="image-title">${data.title} <br /> <span class="date">${data.date}</span></h2>

  <div class="explanation-container">
    <p class="explanation">
      ${data.explanation}
    </p>
  </div>
  `;
}
