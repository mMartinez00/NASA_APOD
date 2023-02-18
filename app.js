const image_container = document.querySelector(".image-container");
const left_arrow = document.querySelector(".fa-arrow-left");
const right_arrow = document.querySelector(".fa-arrow-right");
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
      (image_container.innerHTML = `
    <h1 class="error">Error something went wrong! :(</h1>
  `)
  );

// Creates an image-container for each element in the data array
function createImageContainers(data) {
  let images_array = data.map((object) => {
    const { title, date, media_type, explanation, hdurl, thumbnail_url } =
      object;

    const image_content = document.createElement("div");

    image_content.classList.add("image-content");

    let url = "";

    if (media_type === "image") {
      url += `${hdurl}`;
    } else if (media_type === "video") {
      url += `${thumbnail_url}`;
    }

    image_content.innerHTML = `
      <img class="image" src="${url}" alt="${media_type}" />
      <h2 class="image-title">${title}<br /><span class="date">${date}</span></h2>
      <div class="explanation-container">
        <p class="explanation">${explanation}</p>
      </div>
    `;

    return image_content;
  });

  displayPicture(images_array);
}

// Appends the image-container to the container
function displayPicture(images_array) {
  images_array[images_array.length - 1].classList.add("active");

  for (let i = 0; i < images_array.length; i++) {
    image_container.appendChild(images_array[i]);
  }

  // Decreases the index - 1. Changes image to past dates
  left_arrow.addEventListener("click", () => {
    images_array[slideIndex].classList = "image-content right";

    slideIndex = slideIndex - 1;

    if (slideIndex === 0) {
      left_arrow.style.visibility = "hidden";
    }

    images_array[slideIndex].className = "image-content active";

    right_arrow.style.visibility = "visible";
  });

  // Increase index until it reaches 5 (Current date)
  right_arrow.addEventListener("click", () => {
    images_array[slideIndex].classList = "image-content left";

    slideIndex = slideIndex + 1;

    if (slideIndex > images_array.length - 1) {
      slideIndex = images_array.length - 1;
    }

    if (slideIndex === 5) {
      right_arrow.style.visibility = "hidden";
    }

    images_array[slideIndex].className = "image-content active";

    left_arrow.style.visibility = "visible";
  });
}
