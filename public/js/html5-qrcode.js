
(function( $ ){

  $.fn.html5_qrcode = function(qrcodeSuccess, qrcodeError, videoError) {
    'use strict';
    
    var vidTag = '<video id="html5_qrcode_video" width="0" height="0" muted autoplay></video>' 
    var canvasTag = '<canvas id="qr-canvas" style="display:none;"></canvas>' 
    
    this.append(vidTag);
    this.append(canvasTag);
             
    var size_set = false,
      video        = document.querySelector('#html5_qrcode_video'),
      canvas       = document.querySelector('#qr-canvas'),
      width = 200,
      height = 0,
      scan_timeout = 2000,
      localMediaStream = null;
    
    var scan = function() {
      if (localMediaStream) {
        try {
          if (!size_set) {  
            height = video.videoHeight / (video.videoWidth/width);
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', video.videoWidth);
            canvas.setAttribute('height', video.videoHeight);
            size_set=true;
          }
          canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        } catch (e) {
          // Fix FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=879717
          if (e.name == "NS_ERROR_NOT_AVAILABLE") {
            setTimeout(scan, 0);
          } else {
           throw e;
          }
        }

        try {
          qrcode.decode();
        } catch(e) {
          qrcodeError(e);
        }

        setTimeout(scan, scan_timeout);

      } else {
        setTimeout(scan, scan_timeout);
      }
    }//end snapshot function
    
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

  var videoSelect = null;
    
  function gotSources(sourceInfos) {
    for (var i = 0; i != sourceInfos.length; ++i) {
      var sourceInfo = sourceInfos[i];
      var option = document.createElement("option");
      option.value = sourceInfo.id;
      if (sourceInfo.kind === 'video') {
        option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
        videoSelect.appendChild(option);
      }
    }
  }
  
  // Got Sources only work on Chrome Right now, not on FF. 
  if (typeof MediaStreamTrack !== 'undefined' &&
      typeof(MediaStreamTrack.getSources) != 'undefined' ){
    var selectSourceTag = "<BR/><select id='videoSource'></select>"
    this.append(selectSourceTag);
    videoSelect = document.querySelector("#videoSource");
    $( "#videoSource" ).change(function() {
      start();
    });
    MediaStreamTrack.getSources(gotSources);
  }  
    
    var successCallback = function(stream) {
        localMediaStream = stream;
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else{
          window.stream = stream; // make stream available to console
          video.src = window.URL.createObjectURL(stream);
        }
        video.play();
        
        setTimeout(scan, scan_timeout);
    }

    function start(){
      if (!!window.stream) {
        video.src = null;
        window.stream.stop();
      }
      // Call the getUserMedia method with our callback functions
      if (navigator.getUserMedia) {
        constraints = { video: true, audio : false };
        if (videoSelect != null ){  
          var videoSource = videoSelect.value;
          var constraints = {
            video: {
                optional: [{sourceId: videoSource}]
            },
            audio : false
          };
        }
        navigator.getUserMedia(constraints, successCallback, videoError);
      } else {
        console.log('Native web camera streaming (getUserMedia) not supported in this browser.');
      }

      qrcode.callback = qrcodeSuccess;
    }
    
    function stop(){
      if (!!window.stream) {
        video.src = null;
        window.stream.stop();
      }
    }
    
    start();
  }; // end of html5_qrcode
})( jQuery );
