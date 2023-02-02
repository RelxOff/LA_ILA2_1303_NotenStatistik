import { putInGrades } from "./putInGrades.js";
import { getAllMathGrades } from "./mathGrades.js";
import { getAllGermanGrades } from "./germanGrades.js";
import { router } from "./app.js";

export function buttonManagerGradesInput() {
  router.navigate("#GradesInput");
  putInGrades();
}

export function buttonManagerMath() {
  router.navigate("#Math");
  getAllMathGrades();
}

export function buttonManagerGerman() {
  router.navigate("#German");
  getAllGermanGrades();
}

document.getElementById("mathButton").addEventListener("click", buttonManagerMath);
document.getElementById("germanButton").addEventListener("click", buttonManagerGerman);
document.getElementById("putInGrades").addEventListener("click", buttonManagerGradesInput);

if (window.location.href === "http://127.0.0.1:5500/frontend/") {
  router.navigate("#Home");
}
