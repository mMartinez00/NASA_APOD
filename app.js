const container = document.querySelector(".container");
const left_arrow = document.getElementById("left-arrow");
const right_arrow = document.getElementById("right-arrow");
let slideIndex = 5;

async function fetchPictures() {
  const res = await fetch("/.netlify/functions/fetch");

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

// Creates an image-container for each element in the data array
function createImageContainers(data) {
  let html = data.map((object, index) => {
    const { title, date, media_type, explanation, hdurl, thumbnail_url } =
      object;

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
