import { buttonManagerGradesInput } from "./buttonManager.js";

export function request(URL, fetchPostGradeData) {
  fetch(URL, fetchPostGradeData).then((response) => response.json());
  alert("Die Note wurde gespeichert.");
  buttonManagerGradesInput();
}

export function createRequest() {
  const URL = "http://localhost:3000/api/addone";
  const fetchPostGradeData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      data: {
        Fach: document.getElementById("subject").value,
        Note: document.getElementById("grade").value
      }
    })
  };
  const subject = document.getElementById("subject").value;
  const grade = document.getElementById("grade").value;
  if (subject === "Deutsch" || subject === "Mathematik") {
    if (grade >= 1 && grade <= 6) {
      request(URL, fetchPostGradeData);
    } else {
      alert("Die eingegebenen Daten sind falsch.");
      buttonManagerGradesInput();
    }
  } else {
    alert("Die eingegebenen Daten sind falsch.");
    buttonManagerGradesInput();
  }
}

export function putInGrades() {
  document.getElementById("body").innerHTML = `
  <form onsubmit="return false" id="createGrade">
      <label>Fach:</label><br>
      <input type="text" id="subject"><br> 
      <label>Note:</label><br>
      <input type="number" id="grade"><br>
      <input type="submit" value="Submit" id="submit-Grade">
  </form>
  `;
  const submitGrade = document.getElementById("submit-Grade");
  submitGrade.addEventListener("click", createRequest);
}
