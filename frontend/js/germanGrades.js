import { buttonManagerGerman } from "./buttonManager.js";

export async function showGermanGrades(grade) {
  let showGradeData = "";
  let germanAverageSum = 0;
  let germanAverage = 0;
  let gradeCount = 0;

  let m;
  for (let i = 0; i < grade.length; i++) {
    if (grade[i].Fach === "Deutsch") {
      let gradeAsDouble = parseFloat(grade[i].Note);
      gradeCount++;
      germanAverageSum = germanAverageSum + gradeAsDouble;
      germanAverage = germanAverageSum / gradeCount;
      showGradeData += `
        <div id = "grade-number-${i}">
          <h3>Note:</h3>
          <dd id="grade${i}">${grade[i].Note}</dd>
          <button id="grade${i}-delete">Löschen</button>
        </div>`;
      document.getElementById("body").innerHTML = showGradeData;
      m = i;
    }
  }
  if (!(germanAverage === 0)) {
    let showAverage = `
        <h3>Durchschnitt:</h3>
        <dd id="mathAverage">${germanAverage}</dd>
      `;
    document.getElementById("body").innerHTML += showAverage;
  } else if (gradeCount == 0) {
    document.getElementById("body").innerHTML = "<h1>Sie haben noch keine Noten eingetragen</h1>";
  }
  for (let n = 0; n <= m; n++) {
    if (grade[n].Fach === "Deutsch") {
      const gradeDeleteButtonGerman = document.getElementById(`grade${n}-delete`);
      gradeDeleteButtonGerman.addEventListener("click", () => {
        fetch("http://localhost:3000/api/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: n
          })
        });
        alert("Die Note wurde gelöscht.");
        buttonManagerGerman();
      });
    }
  }
}

export function getAllGermanGrades() {
  fetch("http://localhost:3000/api/getall", {
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  })
    .then((res) => res.json())
    .then((jsonData) => {
      window.showGradeData = jsonData;
    })
    .then(() => {
      showGermanGrades(window.showGradeData);
    });
}
