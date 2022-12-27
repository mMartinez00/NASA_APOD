const fetch = require("node-fetch");
let dateObj = new Date();

// This function formats the current date into YYYY-MM-DD
const end_date = () => {
  dateObj = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - dateObj).toISOString().slice(0, 10);
};

// This Function returns current date - 5 YYYY-MM-DD
const start_date = (date = new Date()) => {
  const previous = new Date(end_date());
  previous.setDate(date.getDate() - 5);

  return new Date(previous - dateObj).toISOString().slice(0, 10);
};

async function fetchPictures() {
  const API_KEY = process.env.NASA_API_KEY;

  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true&start_date=${start_date()}&end_date=${end_date()}`
  );

  const data = await res.json();

  return data;
}

exports.handler = async () => {
  try {
    const body = await fetchPictures();

    return {
      statusCode: 200,
      body: JSON.stringify(body),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};
