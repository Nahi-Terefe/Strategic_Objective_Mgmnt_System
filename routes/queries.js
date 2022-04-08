const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const db = require("../models");
const readXlsxFile = require("read-excel-file/node");
const upload_excel = require("../middleware/upload_excel");



// query api
router.get('/findall', (req, res) => {

    db.Strategic_Objective.findAll({
        where: {
            strategic_direction: 'SO1-SD1',
        }
    }).then(response => res.send(response));
});


module.exports = router;
