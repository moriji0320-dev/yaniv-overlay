const API_URL = "https://script.google.com/macros/s/AKfycbwMVH-JIdPPcbwwd8yWdtzf7B3Pqt8h3amUtPn_ZRDoNrwKsY-fIvxAxHLUlRV1dc7FfQ/exec";

async function loadScores() {
  try {
    const response = await fetch(API_URL + "?t=" + Date.now());
    const data = await response.json();

    data.sort((a, b) => Number(a.total) - Number(b.total));

    const tbody = document.querySelector("#scoreTable tbody");
    tbody.innerHTML = "";

    data.forEach((player, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.total}</td>
      `;

      tbody.appendChild(row);
    });

  } catch (err) {
    console.error(err);
  }
}

loadScores();
setInterval(loadScores, 5000);
