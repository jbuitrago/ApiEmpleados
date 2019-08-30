var express = require('express');
var router = express.Router();
var db = require("../database.js")
var {getLimitPaginate,getRelation} = require("../functions.js")
var md5 = require("md5")

//GET /offices
router.get('/offices', (req, res) => {
    var sql = "select * from office  limit ?,?";
    var sqlCount = "select count(*) total from office";
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

//GET /offices/<id>
router.get('/offices/:id', (req, res) => {

    var sql = "select * from office  where id = ?"
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