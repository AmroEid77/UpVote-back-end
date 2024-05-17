import multer from "multer"

export const fileValidation ={
    image:['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif'],
    file:['application/pdf']
}
function fileUpload(customeValidation =[]) {
    const storage = multer.diskStorage({});


    function fileFilter(req, file, cb) {
        if (customeValidation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb("invalid format", false)

        }
    }

    const upload = multer({ fileFilter, storage })
    return upload;

}

export default fileUpload;




// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// const upload = multer({ storage: storage }).single('file')

// return upload;

//['image/jpeg', 'image/png', 'image/svg+xml', 'image/gif']