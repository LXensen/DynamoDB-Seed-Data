//Require the express package and use express.Router()
const express = require('express');
const router = express.Router();
const util = require('util');
const exec = util.promisify(require('child_process').exec);

//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
    console.log('in get')
    res.send("GET");
});

router.post('/', async (req,res,next) => {
    //console.log(req.body)
    if(!req.body.tableName){
        console.log('error')
        res.status(404)
        res.send('Table Name required');
    }else{
        try{
            const { stdout, stderr } = await exec('aws dynamodb scan --table-name ' + req.body.tableName);
            if(stderr){
                console.log(stderr)
                res.status(404);
                res.send(stderr);
            }
            
            var _json = JSON.parse(stdout)
            //console.log(_json.Count)
            var obj = {};
            var _tableName = req.body.tableName
            obj[_tableName] = [];
            for (var i in _json.Items){
              obj[_tableName][i]= {};
              obj[_tableName][i]["PutRequest"] = {};
              obj[_tableName][i]["PutRequest"]["Item"] = _json.Items[i]
            }
            res.send(obj);
        }catch (e){
            next(e)
        }
    }    
});

module.exports = router;