var dl = require('./downloader');
var downloadDir = __dirname + '\\downloads\\';
console.log(downloadDir);
var urls = [
	"http://163.com",
	"http://github.com/lt1946/Downloader/zipball/master"
	];
var downloader = dl.Downloader;
downloader.on('done', function(msg) {
        console.log(msg);
});
downloader.on('error', function(msg) {
	console.log(msg);
});
for(var i=0; i < urls.length; i++) {
	downloader.download( urls[i], downloadDir);
}
