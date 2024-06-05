"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = require("multer");
var path_1 = require("path");
var fs_1 = require("fs");
var uploadDir = path_1.default.join(__dirname, "public");
console.log(uploadDir, "uploadddd");
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
var upload = (0, multer_1.default)({ storage: storage });
exports.default = upload;
// C:\Users\jishn\OneDrive\Desktop\Redux\backend\src\public
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../public"));
//   },
//   filename: function (req, file, cb) {
//     const uniquSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     console.log(req.body, "heeeeeee");
//     cb(
//       null,
//       file.fieldname + "-" + uniquSuffix + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });
// export default upload;
// At the top of your file
