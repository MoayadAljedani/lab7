const btnXHR = document.getElementById("xhrsearch");
const btnfetch = document.getElementById("fetchSearch");
const btnfetchAsyncAwaitSearch = document.getElementById(
  "fetchAsyncAwaitSearch"
);

let searchQueryelement = document.getElementById("query");
let searchResults = document.getElementById("searchResults");

const apiurl = "https://api.giphy.com/v1/gifs/search";
const api_key = "cLpHxFizUU1Ce6QKsnc1tH9Te29YoymY";

btnXHR.addEventListener("click", function () {
  serachUsingXHR(searchQueryelement.value);
});

btnfetch.addEventListener("click", function () {
  serachUsingfetch(searchQueryelement.value);
});
btnfetchAsyncAwaitSearch.addEventListener("click", function () {
  serachUsingfetchAsyncAwaitSearch(searchQueryelement.value);
});

function serachUsingXHR(query) {
  if (!query || query.trim().length === 0) {
    return;
  }
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      displayResults(JSON.parse(xhr.responseText));
    }
  });
  let params = "api_key=" + api_key + "&q=" + query + "&limit=5&rating=g";
  xhr.open("GET", apiurl + "?" + params);
  xhr.send();
}
function displayResults(respObject) {
  for (item of respObject.data) {
    let imgElement = document.createElement("img");
    imgElement.src = item.images.downsized_medium.url;
    imgElement.alt = item.title;
    searchResults.appendChild(imgElement);
  }
}

function serachUsingfetch(query) {
  if (!query || query.trim().length === 0) {
    return;
  }
  let params = "api_key=" + api_key + "&q=" + query + "&limit=5&rating=g";
  fetch(apiurl + '?' + params, { method: "GET" })
    .then((response) => {
      return response.text();
    }).then((text) => {
      displayResults(JSON.parse(text));

    })
    .catch((err) => {
      console.log(err);
    });
}
async function serachUsingfetchAsyncAwaitSearch(query) {
  if (!query || query.trim().length === 0) {
    return;
  }
  let params = "api_key=" + api_key + "&q=" + query + "&limit=5&rating=g";
  let response = await fetch(apiurl + '?' + params, { method: "GET" })
  let data = await response.json()
  displayResults(data)
}

