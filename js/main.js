var video = document.getElementById('video-player');
var $playerBox = $('#video-player-box');
var $controlBar = $('#control-bar');
var $playPauseButton = $('#play-button');
var $muteButton = $('#mute-button');
var $fullscreenButton = $('#fullscreen-button');
var timeRail = document.getElementById('time-rail');
var currentTime = document.getElementById('current-time');
var totalTime = document.getElementById('total-time');
var transcriptBox = document.getElementById("para-box");
var transcript = transcriptBox.getElementsByTagName("span");


timeRail.addEventListener("change", videoSeek);
video.addEventListener("timeupdate", updateTime);
video.addEventListener("timeupdate", updateTranscript);
video.addEventListener("timeupdate", clickSpan);

$playerBox.mouseover(function () {
  $controlBar.slideDown('fast');
});

$playerBox.mouseleave(function () {
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
  var seekTo = video.duration * (timeRail.value / 100);
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
});

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

function timeToString(time) {
    var result;
    var hours = parseInt(time.substr(0, 2));
    var minutes = parseInt(time.substr(3, 2));
    var seconds = parseInt(time.substr(6, 2));
    var milliseconds = parseInt(time.substr(9, 3));
    result = (hours * 3600) + (minutes * 60) + seconds + (milliseconds * 0.001);
    return result;
}

//======= Transcript =======//

function updateTranscript () {
  var time = video.currentTime;
  if (transcript.length > 0) {
    for (var i = 0; i < transcript.length; i++) {
      var startTime = timeToString(transcript[i].dataset.timeStart);
      var endTime = timeToString(transcript[i].dataset.timeEnd);
      if (time >= startTime && time < endTime) {
        transcript[i].className = "highlight-text";
        transcript[i] = "highlight-text";
      } else {
        transcript[i].className = "";
      }
    }
  }
}

function clickSpan () {
  if (transcript.length > 0) {
    for (var i = 0; i < transcript.length; i++) {
      transcript[i].addEventListener("click", function (event) {
        video.currentTime = timeToString(this.dataset.timeStart);
      });
    }
  }
}
