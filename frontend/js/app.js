import { putInGrades } from "./putInGrades.js";
import { getAllMathGrades } from "./mathGrades.js";
import { getAllGermanGrades } from "./germanGrades.js";
import { Router } from "./router.js";
import { Error } from "./error.js";
import { Home } from "./home.js";

const routes = {
  home: { hash: "#Home", function: Home },
  putIn: { hash: "#GradesInput", function: putInGrades },
  math: { hash: "#Math", function: getAllMathGrades },
  german: { hash: "#German", function: getAllGermanGrades },
  error: { hash: "#Error", function: Error }
};

export const router = new Router(routes);
router.urlResolve();
