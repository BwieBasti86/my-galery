const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const https = require("node:https");
const { swaggerUi, swaggerSpec } = require("./swagger");

//const swaggerUi = require("swagger-ui-express"),
//swaggerDocument = require("./swagger.json");
//app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());
// Swagger UI Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = 3000;

app.post("/addCompanyProfile", (req, res) => {
  console.dir(req.body);
  // Datei einlesen
  fs.readFile(req.body.filePath, "utf8", (err, data) => {
    console.log(data);
    // if (err) {
    //   return res.status(500).json({ error: "Fehler beim Lesen der Datei" });
    // }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      return res
        .status(500)
        .json({ error: "Fehler beim Parsen der JSON-Daten" });
    }

    // JSON durchlaufen und Property hinzufügen, falls sie fehlt

    if (!jsonData.jobApplicationData) {
      jsonData.jobApplicationData = {}; // Falls das Unterobjekt fehlt, erstelle es
    }
    if (!jsonData.jobApplicationData.companies) {
      jsonData.jobApplicationData.companies = {};
    }
    jsonData.jobApplicationData.companies[req.body.companyId] = {
      company: req.body.company,
      subinfo: req.body.subinfo,
      city: req.body.city,
      street: req.body.street,
      zip: req.body.zip,
      phone: req.body.phone,
      mail: req.body.mail,
      jobdescription: req.body.jobdescription,
      applicationHeader: req.body.applicationHeader,
      applicationLetter: req.body.applicationLetter,
      applied: false,
      succeeded: false,
      created: req.body.created ? jsonData.jobApplicationData.companies[req.body.companyId].created : new Date().toISOString(),
      updated: new Date().toISOString(),
    };

    if (req.body.current) {
      jsonData.jobApplicationData.current = req.body.companyId;
    }
    // Aktualisierte Daten zurück in die Datei schreiben
    fs.writeFile(
      req.body.filePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          return res
            .status(500)
            .json({ error: "Fehler beim Schreiben der Datei" });
        }
        res.json({
          message: "JSON-Datei erfolgreich aktualisiert",
          data: jsonData,
        });
      }
    );
  });
});

app.post("/deleteCompanyProfile", (req, res) => {
  console.dir(req.body);
  // Datei einlesen
  fs.readFile(req.body.filePath, "utf8", (err, data) => {
    console.log(data);
    // if (err) {
    //   return res.status(500).json({ error: "Fehler beim Lesen der Datei" });
    // }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      return res
        .status(500)
        .json({ error: "Fehler beim Parsen der JSON-Daten" });
    }

    // JSON durchlaufen und Property hinzufügen, falls sie fehlt
    if(jsonData.jobApplicationData.companies[req.body.companyId]){
      let result = {}
      let companies = jsonData.jobApplicationData.companies;
      Object.keys(companies).forEach(company=>{
        if(company !== req.body.companyId){
          Object.assign(result,{[company]:companies[company]})
        }
        
      })
      jsonData.jobApplicationData.companies = result;
    }

    // Aktualisierte Daten zurück in die Datei schreiben
    fs.writeFile(
      req.body.filePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          return res
            .status(500)
            .json({ error: "Fehler beim Schreiben der Datei" });
        }
        res.json({
          message: "JSON-Datei erfolgreich aktualisiert",
          data: jsonData,
        });
      }
    );
  });
});

app.post("/current", (req, res) => {
  console.dir(req.body);
  // Datei einlesen
  fs.readFile(req.body.filePath, "utf8", (err, data) => {
    console.log(data);
    // if (err) {
    //   return res.status(500).json({ error: "Fehler beim Lesen der Datei" });
    // }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      return res
        .status(500)
        .json({ error: "Fehler beim Parsen der JSON-Daten" });
    }

    // JSON durchlaufen und Property hinzufügen, falls sie fehlt

    if (req.body.current) {
      jsonData.jobApplicationData.current = req.body.current;
    }
    // Aktualisierte Daten zurück in die Datei schreiben
    fs.writeFile(
      req.body.filePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (writeErr) => {
        if (writeErr) {
          return res
            .status(500)
            .json({ error: "Fehler beim Schreiben der Datei" });
        }
        res.json({
          message: "JSON-Datei erfolgreich aktualisiert",
          data: jsonData,
        });
      }
    );
  });
});

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
});
