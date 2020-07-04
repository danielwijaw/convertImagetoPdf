const imagesToPdf = require("images-to-pdf");
const fs = require('fs');
const hbjs = require('handbrake-js')

module.exports = {
    index: function(req, res) {
        res.render('index');
    },
    videoIndex: function(req, res) {
        res.render('video');
    },
    convert: function(req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let imageHere = req.files.imageHere;
        imageHere.mv('public/images/'+imageHere.md5, function(err) {
            if (err){
                return res.status(500).send(err);
            }else{
                imagesToPdf(['public/images/'+imageHere.md5], 'public/pdf/'+imageHere.md5+'.pdf');
                fs.unlink('public/images/'+imageHere.md5, function() {
                    res.redirect(301, 'pdf/'+imageHere.md5+'.pdf');   
                });
            }
        });
    },
    convertmpfour: function(req, res){
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        let videoHere = req.files.videoHere;
        videoHere.mv('public/videopath/'+videoHere.md5, function(err) {
            if (err){
                return res.status(500).send(err);
            }else{
                hbjs.spawn({ input: 'public/videopath/'+videoHere.md5, output: 'public/videopath/'+videoHere.md5+'.mp4' })
                .on('error', err => {
                    return res.status(500).send(err);
                })
                .on('progress', progress => {
                    console.log(
                    'Percent complete: %s, ETA: %s',
                    progress.percentComplete,
                    progress.eta
                    )
                })
                .on('end', function(){
                    console.log('Complete');
                    fs.unlink('public/videopath/'+videoHere.md5, function() {
                        res.redirect(301, 'videopath/'+videoHere.md5+'.mp4');   
                    });
                })
            }
        });
    },
}