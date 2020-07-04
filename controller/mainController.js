const imagesToPdf = require("images-to-pdf")

module.exports = {
    index: function(req, res) {
        res.render('index');
    },
    convert: function(req, res, file) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let imageHere = req.files.imageHere;
        imageHere.mv('public/images/'+imageHere.md5+'.jpg', function(err) {
            if (err){
                return res.status(500).send(err);
            }else{
                imagesToPdf(['public/images/'+imageHere.md5+'.jpg'], 'public/pdf/'+imageHere.md5+'.pdf')
                res.redirect(301, 'pdf/'+imageHere.md5+'.pdf');
            }
        });
    },
}