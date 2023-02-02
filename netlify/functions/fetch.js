const fetch = require("node-fetch");
const date = require("date-and-time");

const today = new Date();

const end_date = () => date.format(today, "YYYY-MM-DD");

const start_date = () => {
  const previous = new Date();
  previous.setDate(today.getDate() - 5);

  return date.format(previous, "YYYY-MM-DD");
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
