var express = require('express');
var router = express.Router();
var db = require("../database.js")
var getLimitPaginate = require("../functions.js")
var md5 = require("md5")

//GET /departments
router.get('/departments', (req, res) => {
    var sql = "select * from department  limit ?,?";
    var sqlCount = "select count(*) total from department";
    let params = [];
    db.get(sqlCount, (err, row) => {

        total = row.total;
        if (total > 0) {
            //Obtener limites para paginado
            getLimitPaginate(req, params, total);

            db.all(sql, params, (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                res.json({
                    "message": "success",
                    "data": rows
                })
            });
        } else {
            res.json({
                "message": "No rows",
                "data": row.total
            })

        }

    });
});

//GET /departments/<id>
router.get('/departments/:id', (req, res) => {

    var sql = "select * from department  where id = ?"
    var params = [req.params.id]

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }

        res.json({
            "message": "success",
            "data": row
        })
    });


});



module.exports = router;