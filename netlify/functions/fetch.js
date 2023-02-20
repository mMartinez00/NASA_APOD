const fetch = require("node-fetch");
const date = require("date-and-time");

const end_date = () => {
  let today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());

  return date.format(today, "YYYY-MM-DD");
};

const previousFive = () => {
  const previous = new Date();
  previous.setMinutes(previous.getMinutes() - previous.getTimezoneOffset());
  previous.setDate(previous.getDate() - 5);

  return previous;
};

const start_date = () => date.format(previousFive(), "YYYY-MM-DD");

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
