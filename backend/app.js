const express = require("express");
const bodyParser = require("body-parser");
const { GradeData } = require("./data/data.js");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
const port = 3000;

var savedData = GradeData.map(function(item) {
  return {
    Fach: item.Fach,
    Note: item.Note
  };
});

app.use(cors());

app.get("/api/getall", (req, res) => {
  try {
    res.json(savedData);
  } catch (error) {
    //for debugging
    console.error(error);
    res.json({
      error: true,
      message: "error couldn't get all data",
    });
  }
})

app.post("/api/addone", (req, res) => {
  try {
    let savedDataLength = savedData.length;
    savedData.push(req.body.data).savedDataLength;
    res.json({
      error: false,
      "id": savedDataLength,
    });
  } catch (error) {
    //for debugging
    console.error(error);
    res.json({
      error: true,
      message: "error couldn't add data",
    });
  }
})

app.delete("/api/delete", (req, res) => {
  try {
    let maxArryLength = savedData.length -1;
    for (let i = 0; i < savedData.length; i++) {
      let idAsInt = parseFloat(i);
      if (req.body.id == idAsInt) {
        savedData.splice(i, 1);
        res.json({
          error: false,
          message: "deletion of data was successful"
        });
        break;
      }
      else if (req.body.id > maxArryLength) {
        res.json({
          error: true,
          message: "nothing to delete"
        });
        break;
      }
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: true,
      message: "deletion of data was NOT successful"
    });
  }
})

app.listen(port, () => {
  console.log(`API listening @ http://localhost:${port}`);
});

/* 
https://www.youtube.com/watch?v=Znh8Ell_lCk hat mir beim erstellen von get geholfen.
*/
