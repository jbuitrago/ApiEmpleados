var express = require('express');
var router = express.Router();
var db = require("../database.js")
var {getLimitPaginate,getRelation} = require("../functions.js")
var md5 = require("md5")


router.get('/employees', (req, res) => {
    var table = "employee";
    var sql = "select * from " + table ;
    var limit = " limit ?,? ";
    var join = " ";
    var where = "where  1= 1";
   
    var sqlCount = "select count(*) total from " + table;

    //Rel
    //join =getRelation(req,table);
    sql = sql + join  + where + limit;
    /*sql=JSON.stringify(sql);
    sql = sql.replace(",","");
    sql = sql.replace(",","");
    sql = sql.replace(",","");
    sql = sql.replace(",","");*/

    //sqlCount=
    console.log(sql);
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


router.get('/employees/:id', (req, res) => {

    var sql = "select * from employee  where id = ?"
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