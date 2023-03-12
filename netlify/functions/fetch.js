const fetch = require("node-fetch");

const end_date = () => {
  let date = new Date();

  return new Date(
    date.toLocaleDateString("en-US", { timeZone: "America/New_York" })
  )
    .toISOString()
    .slice(0, 10);
};

const start_date = () => {
  let prev = new Date(end_date());

  prev.setDate(prev.getDate() - 5);

  return prev.toISOString().slice(0, 10);
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
