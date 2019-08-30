// get Limit Paginate
let getLimitPaginate =  function getLimitPaginate(req, params, total) {

    var limiteI = 0;
    var limiteF = total;
    var maxLimitF = 100;
    var cant = 0;
    var p = 0;

    //validar parametros
    //?cant=
    if (typeof req.query.cant !== 'undefined') {
        cant = parseInt(req.query.cant);    //?p=
        if (typeof req.query.p !== 'undefined') {
            p = req.query.p != '' ? parseInt(req.query.p) : 10;

            //Calcular limites 
            if (p == 0 || p == 1) {
                limiteI = 0;
                limiteF = cant;
            } else {
                limiteF = cant;
                limiteI = ((p - 1) * cant);
            }
        }
        params.push(limiteI);
        params.push(limiteF);
    } else {

        limiteF = maxLimitF;
        params.push(limiteI);
        params.push(limiteF);
    }

    return params;

}


let getRelation =  function getRelation(req,table) {

    if (typeof req.query.rel !== 'undefined') {
        
        if(eq.query.rel.length >1){
        join = req.query.rel.map((rel) => {
            var relation = rel.split(".");
            var joinTable = "";
            var joinTableN = "";
            var joinAlias = "";
            var joinOn = "";
            var i = 0;
            var join = "";
              for (i = 0; i < relation.length; i++) {
                joinTable = relation[i];
                if(joinTable == "manager"){
                    joinTable = "employee";
                    joinAlias = relation[i];
                    joinOn = joinAlias + ".id" + " = "+ joinTable + "." + joinAlias;
                }else if(joinTable == "superdepartment"){
                    joinTableN = "department";
                    joinAlias = relation[i];
                    //joinOn = joinTableN+ ".id" + " = "+ joinTableN + "." + joinAlias;
                }else{
                    joinAlias =joinTable;
                    joinOn = joinAlias + ".id" + " = " + table + "." + joinAlias;
               }
                 join = join + " join " + joinTable + " " + joinAlias  + " on " + joinOn;
                 return join;
             }
  
        });
        }

    }

    return join;
}
module.exports = {getLimitPaginate , getRelation }