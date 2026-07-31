const API_URL = "https://script.google.com/macros/s/AKfycbwMVH-JIdPPcbwwd8yWdtzf7B3Pqt8h3amUtPn_ZRDoNrwKsY-fIvxAxHLUlRV1dc7FfQ/exec";

async function loadScores() {
  try {
    const response = await fetch(API_URL + "?t=" + Date.now());

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const data = await response.json();

    data.sort((a, b) => Number(a.total) - Number(b.total));

    const tbody = document.querySelector("#scoreTable tbody");
    tbody.innerHTML = "";

    data.forEach((player, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.name}</td>
        <td>${player.total}</td>
      `;

      tbody.appendChild(tr);
    });

  } catch (e) {
    console.error(e);

    const tbody = document.querySelector("#scoreTable tbody");
    tbody.innerHTML = `
      <tr>
        <td colspan="3">データ取得エラー</td>
      </tr>
    `;
  }
}

loadScores();
setInterval(loadScores, 5000);
