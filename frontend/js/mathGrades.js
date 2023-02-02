import { buttonManagerMath } from "./buttonManager.js";

export async function showMathGrades(grade) {
  let showGradeData = "";
  let mathAverageSum = 0;
  let mathAverage = 0;
  let gradeCount = 0;

  let m;
  for (let i = 0; i < grade.length; i++) {
    if (grade[i].Fach === "Mathematik") {
      let gradeAsDouble = parseFloat(grade[i].Note);
      gradeCount++;
      mathAverageSum = mathAverageSum + gradeAsDouble;
      mathAverage = mathAverageSum / gradeCount;
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
  if (!(mathAverage === 0)) {
    let showAverage = `
        <h3>Durchschnitt:</h3>
        <dd id="mathAverage">${mathAverage}</dd>
      `;
    document.getElementById("body").innerHTML += showAverage;
  } else if (gradeCount == 0) {
    document.getElementById("body").innerHTML = "<h1>Sie haben noch keine Noten eingetragen</h1>";
  }
  for (let n = 0; n <= m; n++) {
    if (grade[n].Fach === "Mathematik") {
      const gradeDeleteButtonMath = document.getElementById(`grade${n}-delete`);
      gradeDeleteButtonMath.addEventListener("click", () => {
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
        buttonManagerMath();
      });
    }
  }
}

export function getAllMathGrades() {
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
      showMathGrades(window.showGradeData);
    });
}
