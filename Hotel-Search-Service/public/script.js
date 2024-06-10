document.getElementById("searchForm").onsubmit = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  
    const response = await fetch("/search?" + new URLSearchParams(data), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const result = await response.json();
    displayResults(result.rooms);
  };
  
  function displayResults(rooms) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    rooms.forEach((room) => {
      const roomDiv = document.createElement("div");
      roomDiv.classList.add("room");
      roomDiv.innerHTML = `
        <h3>${room.name}</h3>
        <p>Konum: ${room.location}</p>
        <p>Oda Tipi: ${room.roomType}</p>
        <p>Fiyat: ${room.price.toFixed(2)} TL</p>
      `;
      resultsDiv.appendChild(roomDiv);
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const welcomeMessage = document.getElementById("welcomeMessage");
      welcomeMessage.innerHTML = `<h2>Hoşgeldin, ${user.email}</h2>`;
    }
  });
  