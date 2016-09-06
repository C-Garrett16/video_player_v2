var video = document.getElementById('video-player');
var $playerBox = $('#video-player-box');
var $controlBar = $('#control-bar');
var $playPauseButton = $('#play-button');
var $muteButton = $('#mute-button');
var $fullscreenButton = $('#fullscreen-button');
var timeRail = document.getElementById('time-rail');
var currentTime = document.getElementById('current-time');
var totalTime = document.getElementById('total-time');
var trackTimes = ["00:00:00.240",
                  "00:00:04.130 --> 00:00:07.535",
                  "00:00:07.535 --> 00:00:11.270",
                  "00:00:11.270 --> 00:00:13.960",
                  "00:00:13.960 --> 00:00:17.940",
                  "00:00:17.940 --> 00:00:22.370",
                  "00:00:22.370 --> 00:00:26.880",
                  "00:00:26.880 --> 00:00:30.920",
                  "00:00:32.100 --> 00:00:34.730",
                  "00:00:34.730 --> 00:00:39.430",
                  "00:00:39.430 --> 00:00:41.190",
                  "00:00:42.350 --> 00:00:46.300",
                  "00:00:46.300 --> 00:00:49.270",
                  "00:00:49.270 --> 00:00:53.760",
                  "00:00:53.760 --> 00:00:57.780",
                  "00:00:57.780 --> 00:01:00.150"];
var transcriptBox = document.getElementById("para-box");
var transcript = transcriptBox.getElementsByTagName("span");


timeRail.addEventListener("change", videoSeek);
video.addEventListener("timeupdate", updateTime);
video.addEventListener();

$('#video-player-box').mouseover(function () {
  $controlBar.slideDown('fast');
});

$('#video-player-box').mouseleave(function () {
  $controlBar.slideUp('fast');
});

//======= Play Button =======//

$playPauseButton.click(function () {
  if (video.paused) {
    video.play();
    $playPauseButton.css('background', 'url(icons/pause-icon.png) center center no-repeat');
  } else {
    video.pause();
    $playPauseButton.css('background', 'url(icons/play-icon.png) center center no-repeat');
  }
});

//======= Range Slider =======//

function videoSeek () {
  var seekTo = video.duration * (timeRail.value / 100)
  video.currentTime = seekTo;
}

function updateTime () {
  var newTime = video.currentTime * (100 / video.duration);
  timeRail.value = newTime;

  var currentMin = Math.floor(video.currentTime / 60);
  var currentSec = Math.floor(video.currentTime - currentMin * 60);
  var totalMin = Math.floor(video.duration / 60);
  var totalSec = Math.floor(video.duration - totalMin * 60);

  if (currentSec < 10) {
    currentSec = "0" + currentSec;
  }
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }

  currentTime.innerHTML = currentMin + ":" + currentSec;
  totalTime.innerHTML = totalMin + ":" + totalSec;

}

//======= Mute Button =======//

$muteButton.click(function () {
  if (video.muted) {
    video.muted = false;
    $muteButton.css('background', 'url(icons/volume-on-icon.png) center center no-repeat');
  } else {
    video.muted = true;
    $muteButton.css('background', 'url(icons/volume-off-icon.png) center center no-repeat');
  }
})



//======= Fullscreen Button =======//

$fullscreenButton.click(function() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  }
});

function convertTimeString(time) {
    var result;
    var hours = parseInt(time.substr(0, 2));
    var minutes = parseInt(time.substr(3, 2));
    var seconds = parseInt(time.substr(6, 2));
    var milliseconds = parseInt(time.substr(9, 3));
    result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
    return result;
}

//======= Transcript =======//
function updateTranscript (time) {
  if (transcript.length > 0) {
    for (var i = 0; i < transcript.length; i++) {
      //compare time to captions data
      var startTime = convertTimeString(transcript[i].dataset.start);
      var endTime = convertTimeString(transcript[i].dataset.end);
      if (time >= startTime && time <= endTime ) {
          transcript[i].className = "highlight";
      } else {
          transcript[i].className = "";
      }
    }
  }
}
