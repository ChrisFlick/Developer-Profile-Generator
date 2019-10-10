var fs = require('fs'),
    convertFactory = require('electron-html-to');
 
var conversion = convertFactory({
  converterPath: convertFactory.converters.PDF,
  // strategy: 'dedicated-process',
  // browserWindow: {
  //   width: 600, // defaults to 600
  //   height: 600, // defaults to 600
  //   x: 0,
  //   y: 0,
  //   useContentSize: false,
  //   webPreferences: {
  //     nodeIntegration: false, // defaults to false
  //     partition: '',
  //     zoomFactor: 3.0,
  //     javascript: true, // defaults to true
  //     webSecurity: false, // defaults to false
  //     allowDisplayingInsecureContent: true,
  //     allowRunningInsecureContent: true,
  //     images: true,
  //     java: true,
  //     webgl: true,
  //     webaudio: true,
  //     plugins: null,
  //     experimentalFeatures: null,
  //     experimentalCanvasFeatures: null,
  //     overlayScrollbars:null ,
  //     overlayFullscreenVideo:null ,
  //     sharedWorker: null,
  //     directWrite:null
    // }
  // },
})
 
conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
  if (err) {
    return console.error(err);
  }
 
  console.log(result.numberOfPages);
  console.log(result.logs);
  result.stream.pipe(fs.createWriteStream('/path/to/anywhere.pdf'));
  conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
});