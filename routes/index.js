const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const db = require("../models");
const readXlsxFile = require("read-excel-file/node");
const upload_excel = require("../middleware/upload_excel");

// landing page screen
router.get('/', (req, res) => {
    res.send("Hello Sir!");

    res.send("Land page coming soon :)")
})

// add strategic objective in to db table
router.post('/add', (req, res) => {

    const {
        strategic_obj,
        strategic_direction,
        major_activities,
        detailed_activity,
        detailed_activity_wight,
        performance,
        responsible_directorate
    } = req.body;

    db.Strategic_Objective.create({
        strategic_obj: strategic_obj,
        strategic_direction: strategic_direction,
        major_activities: major_activities,
        detailed_activity: detailed_activity,
        detailed_activity_wight: detailed_activity_wight,
        performance: performance,
        responsible_directorate: responsible_directorate
    }).then(response => res.send(response))

})

router.post('/upload', upload_excel.single("file"), (req, res) => {

    try {
        if (req.file == undefined) {
          return res.status(400).send("Please upload an excel file!");
        }

        let path =
          __dirname + "/../assets/uploads/" + req.file.filename;

        readXlsxFile(path).then((rows) => {
          // skip header
          rows.shift();

          let rows_data = [];
          rows.forEach((row) => {
            let row_data = {

              strategic_obj: row[0],
              strategic_direction: row[1],
              major_activities: row[2], 
              detailed_activity: row[3],
              detailed_activity_wight: row[4],
              performance: [5],
              responsible_directorate: [6]
            };
            rows_data.push(row_data);
          });
          db.Strategic_Objective.bulkCreate(rows_data)
            .then(() => {
              res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                error: error.message,
              });
            });
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: "Could not upload the file: " + req.file.originalname,
        });
      }
    
})

module.exports = router;