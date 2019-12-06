/* Global Variables */
const apiKey = "df2a1559605cafdf6569234234819f95"; //!!!!!!!!
const fetchtUrl = "/get_entries";
const postUrl = "/post_entries";
const fetchWeatherUrl = "//api.openweathermap.org/data/2.5/weather";
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=df2a1559605cafdf6569234234819f95

const fetchEntries = async () => {
  const response = await fetch(fetchtUrl);
  const jsonData = await response.json();

  const contentEl = document.getElementById("content");
  const dateEl = document.getElementById("date");
  const tempEl = document.getElementById("temp");
  const { content = '', date, temp } = jsonData;

  if (date && temp) {
    contentEl.innerHTML = `Message: ${content}`;
    dateEl.innerHTML = `Date: ${date}`;
    tempEl.innerHTML = `Temperature: ${temp} °F`;
  } else {
    contentEl.innerHTML = '';
    dateEl.innerHTML = '';
    tempEl.innerHTML = '';
  }
};

const postEntries = async (data = {foo: 'bar'}) => {
  await fetch(postUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
};

const fetchWeather = async (zip) => {
  const url = `http:${fetchWeatherUrl}?zip=${zip}&appid=${apiKey}&units=imperial`;
  const response = await fetch(url);
  return await response.json();
};

const onSaveClick = async () => {
  const feelings = document.getElementById("feelings").value;
  const zip = document.getElementById("zip").value;

  await fetchWeather(zip).then(({ main }) => {
      const data = {
        temp: main && main.temp,
        date: new Date().toLocaleDateString(),
        content: feelings
      };
      postEntries(data).then(fetchEntries);
  })
};

fetchEntries();

const generateEl = document.getElementById("generate");
generateEl.addEventListener("click", onSaveClick);
