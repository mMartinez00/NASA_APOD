const container = document.querySelector(".container");
const left_arrow = document.getElementById("left-arrow");
const right_arrow = document.getElementById("right-arrow");
const API_KEY = config.API_KEY;
let dateObj = new Date();
let slideIndex = 5;

// This function formats the current date into YYYY-MM-DD
const end_date = () => {
  dateObj = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - dateObj).toISOString().slice(0, 10);
};

// This Function returns todays date - 5
const previousFiveDays = (date = new Date()) => {
  const previous = new Date(end_date());
  previous.setDate(date.getDate() - 5);

  return previous;
};

// Format past date YYYY-MM-DD
const start_date = () => {
  dateObj = new Date().getTimezoneOffset() * 60000;
  return new Date(previousFiveDays() - dateObj).toISOString().slice(0, 10);
};

async function fetchPictures() {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${start_date()}&end_date=${end_date()}`
  );

  const data = await res.json();

  return data;
}

fetchPictures()
  .then((data) => createImageContainers(data))
  .catch(
    () =>
      (container.innerHTML = `
    <h1 class="error">Error something went wrong! :(</h1>
  `)
  );

// Creates an image-container for each element in the array
function createImageContainers(data) {
  let html = data.map((obj, index) => {
    const { title, date, hdurl, media_type, explanation, thumbnail_url } = obj;

    const image_container = document.createElement("div");

    if (index === 5) {
      // Current date index === 5
      image_container.classList.add("active");
    }

    image_container.classList.add("image-container");

    let url = "";

    if (media_type === "image") {
      url += `${hdurl}`;
    } else if (media_type === "video") {
      url += `${thumbnail_url}`;
    }

    image_container.innerHTML = `
      <img class="image" src="${url}" alt="${media_type}" />
      <h2 class="image-title">${title}<br /><span class="date">${date}</span></h2>
      <div class="explanation-container">
        <p class="explanation">${explanation}</p>
      </div>
    `;

    return image_container;
  });

  displayPicture(html);
}

// Appends the image-container to the container
function displayPicture(html) {
  for (let i = 0; i < html.length; i++) {
    container.appendChild(html[i]);
  }

  // Decreases the index - 1. Changes image to past dates
  left_arrow.addEventListener("click", () => {
    html[slideIndex].classList = "image-container right";

    slideIndex = slideIndex - 1;

    if (slideIndex === 0) {
      left_arrow.style.visibility = "hidden";
    }

    html[slideIndex].className = "image-container active";

    right_arrow.style.visibility = "visible";
  });

  // Increase index until it reaches 5 (Current date)
  right_arrow.addEventListener("click", () => {
    html[slideIndex].classList = "image-container left";

    slideIndex = slideIndex + 1;

    if (slideIndex > html.length - 1) {
      slideIndex = html.length - 1;
    }

    if (slideIndex === 5) {
      right_arrow.style.visibility = "hidden";
    }

    html[slideIndex].className = "image-container active";

    left_arrow.style.visibility = "visible";
  });
}
