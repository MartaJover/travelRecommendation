const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const travelRecommendations = [];

function searchTravelRecommendation() {
    const input = document.getElementById('Search').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let found = false;

            // Check in countries
            data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(input)) {
                    found = true;
                    resultDiv.innerHTML += `<h2>City: ${city.name}</h2>`;
                    resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}" width="300">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${city.description}</p>`;
                    }
                });
            });

            // Check if input matches "temples" (list all temples)
            if (input.includes('temple') || input.includes('temples')) {
                found = true;
                resultDiv.innerHTML += `<h2>List of Temples:</h2>`;
                data.temples.forEach(temple => {
                    resultDiv.innerHTML += `<h3>${temple.name}</h3>`;
                    resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name}" width="300">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${temple.description}</p>`;
                });
            }

            // Check in beaches
                if (input.includes('beach') || input.includes('beaches')) {
                    found = true;
                    resultDiv.innerHTML += `<h2>List of Beaches:</h2>`;
                    data.beaches.forEach(beach => {
                    resultDiv.innerHTML += `<h2>Beach: ${beach.name}</h2>`;
                    resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name}" width="300">`;
                    resultDiv.innerHTML += `<p><strong>Description:</strong> ${beach.description}</p>`;
                });
            }

            if (!found) {
                resultDiv.innerHTML = 'No matching destination found.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
}

function clearSearch() {
    document.getElementById('Search').value = '';
    document.getElementById('result').innerHTML = '';
}

document.getElementById('btnSearch').addEventListener('click', searchTravelRecommendation);
document.getElementById('btnClear').addEventListener('click', clearSearch);