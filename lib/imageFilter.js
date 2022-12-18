const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|webp|WEBP|png|PNG|pdf|PDF)$/)) {
        req.validationError = {
            'fieldname': file.fieldname,
            'messages': 'Invalid Image'
        }
        req.fileValidationError = 'Invalid Image';
        return cb(new Error('Invalid Image'), false);
    }
    cb(null, true);
};
export const pdfFilter = (req, file, cb) => {

    if (!file.originalname.match(/\.(pdf|PDF)$/)) {
        req.validationError = {
            'fieldname': file.fieldname,
            'messages': 'INVALID_DOC'
        }
        req.fileValidationError = 'INVALID_DOC';
        return cb(new Error('INVALID_DOC'), false);
    }
    cb(null, true);
}

export const checkFormat = (fileName, type) => {
    if (type == 'pdf') {
        return fileName.match(/\.(pdf|PDF)$/) ? true : false
    }
    return false
}
export default imageFilter;