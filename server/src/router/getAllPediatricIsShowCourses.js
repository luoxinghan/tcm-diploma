const express = require('express');
const router = express.Router();
const requestHelper = require('request-promise');
const optionsForGetAllContents = {
    method: 'GET',
    url: 'http://localhost:3001/api/manage/containers/pediatric/courses',
    json: true
};
let resObject = {
    "success" : false,
    "data" : {
        "code" : 400,
        "message" : "Failed",
        "courses" : []
    }
};
router.get('/', (req, res)=>{
    requestHelper(optionsForGetAllContents)
        .then(function (response) {
            // Request was successful, use the response object at will
            for(let i = 0; i < response.data.courses.length; i++){
                if(response.data.courses[i].isShow === 1) {
                    // response.data.courses[i].pop();
                    resObject.data.courses.push( response.data.courses[i]);
                }
            }
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all valid records"
            res.json(resObject);
            res.end();
            return 1;
        })
        .catch(function (err) {
            res.json(err.toString());
            res.end();
            return 1;
        });
});

module.exports = router;
