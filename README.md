# NASA Astronomy Picture of The Day

Having an interest in astronomy, I created a slideshow with images provided by the [NASA APOD API](https://api.nasa.gov/). This slideshow contains 6 images. Each image contains:

1. Title
2. Date photo was taken
3. Explanation about the image

By default the program will display the image of todays date. The user is able to view the APOD of the past five days.

---

One challange I faced was for the program to automatically update the images daily. I used two function expressions `start_date()` (returns five days ago relative to todays date) & `end_date()` (returns current date). The dates are formatted in YYYY-MM-DD.

```javascript
let dateObj = new Date();

// This function formats the current date into YYYY-MM-DD
const end_date = () => {
  dateObj = new Date().getTimezoneOffset() * 60000;
  return new Date(Date.now() - dateObj).toISOString().slice(0, 10);
};

// This Function returns current date - 5 in YYYY-MM-DD
const start_date = (date = new Date()) => {
  const previous = new Date(end_date());
  previous.setDate(date.getDate() - 5);

  return new Date(previous - dateObj).toISOString().slice(0, 10);
};
```

These functions served as query paramaters in the fetch method.

```javascript
async function fetchPictures() {
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&thumbs=true&start_date=${start_date()}&end_date=${end_date()}`
  );

  const data = await res.json();

  return data;
}
```

<!-- WRITE ABOUT THE RESULT IN THE FETCH METHOD. WHAT IS IN DATA? ARRAY...HOW MANY ELEMENTS IN ARRAY? ETC ETC -->
