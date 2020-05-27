const express = require('express');
const router = express.Router();
const requestHelper = require('request-promise');
const optionsForGetAllContents = {
    method: 'GET',
    url: 'http://localhost:3001/api/manage/containers/moments?getIsShowmoemnt=true',
    json: true
};
const optionsForGetImagesByMomentId = {
    method: 'POST',
    url: 'http://localhost:3001/api/manage/containers/moments/images',
    body: {momentId: -1},
    json: true
};
let resObject = {
    "success" : false,
    "data" : {
        "code" : 400,
        "message" : "Failed",
        "moments" : []
    }
};
function clearCache(resObject){
    resObject.success = false;
    resObject.data.code = 400;
    resObject.data.moments = [];
}
router.get('/', (req, res)=>{
    requestHelper(optionsForGetAllContents)
        .then(function (response) {
            resObject.success = true;
            resObject.data.code = 200;
            resObject.data.message = "Successfully get all valid records";
            // Request was successful, use the response object at will
            for(let i = 0; i < response.data.moments.length; i++){
                if(response.data.moments[i].isShow === 1) {
                    let momentWithImagesObject = response.data.moments[i];
                    optionsForGetImagesByMomentId.body.momentId = response.data.moments[i].momentId;
                    requestHelper(optionsForGetImagesByMomentId)
                        .then(function (response2) {
                            // Request was successful, use the response object at will
                            momentWithImagesObject.images = response2.data.images;
                            resObject.data.moments.push(momentWithImagesObject);
                            if(resObject.data.moments.length === response.data.moments.length){
                                res.json(resObject);
                                res.end();
                                clearCache(resObject);
                                return 1;
                            }
                        })
                        .catch(function (err) {
                            res.json(err);
                            res.end();
                            clearCache(resObject);
                            return 1;
                        });
                }
            }
            return 1;
        })
        .catch(function (err) {
            res.json(resObject);
            res.end();
            clearCache(resObject);
            return 1;
        });
        return 1;
});

module.exports = router;
