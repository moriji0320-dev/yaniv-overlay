const API_URL = "https://script.google.com/macros/s/AKfycbyBNunhFMHSMFi0UG8_0e7kzjFuVV2XJPtQTVtRL6n1KQmzPhF1niGBuAcnriRE-hZj6A/exec";

async function loadScores() {
  const tbody = document.querySelector("#scoreTable tbody");

  try {
    const response = await fetch(API_URL + "?t=" + Date.now());
    if (!response.ok) throw new Error("HTTP " + response.status);

    const data = await response.json();

    data.sort((a, b) => Number(a.total) - Number(b.total));

    tbody.innerHTML = "";

    data.forEach((player, index) => {
      tbody.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${player.name}</td>
          <td>${player.total}</td>
        </tr>
      `;
    });

  } catch (e) {
    console.error(e);
    tbody.innerHTML = `
      <tr>
        <td colspan="3">データ取得エラー</td>
      </tr>
    `;
  }
}

loadScores();
setInterval(loadScores, 5000);
