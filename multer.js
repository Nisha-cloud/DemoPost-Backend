const multer = require('multer')
const path = require('path')

var storage1 = multer.diskStorage({destination:function(req,file,cb){
    cb(null,'Public/Postimg')
},
filename: function(req,file,cb){
    cb(null, 'Post'+'-'+Date.now() + path.extname(file.originalname))
}
})

module.exports ={
    upload_Post:multer({storage: storage1})
   
}