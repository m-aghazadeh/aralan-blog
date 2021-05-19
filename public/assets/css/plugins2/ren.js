const fs = require('fs');

var data;
// this is wrong because it has to loop trough all files.
fs.readFile(__dirname + '/tmpl/filename.html', 'utf8', function(err, html){
    if(err) throw err;
    //filename must be without .html at the end
    data['filename'] = html;
});
