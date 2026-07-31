const API_URL = "https://script.google.com/macros/s/AKfycbwP5Azyzue0baV-kpVFih8j8KQvqgMOfIcqNT7tmVJtTYoSH08spQJOSnFXQfNEiTpXww/exec";

async function loadScores() {
  const tbody = document.querySelector("#scoreTable tbody");

  try {
    const response = await fetch(API_URL + "?t=" + Date.now());

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const data = await response.json();

    data.sort((a, b) => Number(a.total) - Number(b.total));

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

  } catch (error) {
    console.error(error);

    tbody.innerHTML = `
      <tr>
        <td colspan="3">データ取得エラー</td>
      </tr>
    `;
  }
}

loadScores();
setInterval(loadScores, 5000);
