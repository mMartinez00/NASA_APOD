const fetch = require("node-fetch");
let date = new Date();

const end_date = () => {
  date = new Date().getTimezoneOffset() * 60000;

  return new Date(Date.now() - date).toISOString().slice(0, 10);
};

const start_date = () => {
  const previous = new Date();
  previous.setDate(previous.getDate() - 5);

  return new Date(previous.getTime() - previous.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
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
