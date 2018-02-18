$(document)
    .ready(function () {
        //#region - Playlist creation
        var $playlist = $('.playlist');
        var mediaData = data[0];
        var allItems = [];
        const $video = $("video");
        const player = document.querySelector('.player');
        const viewer = player.querySelector('.viewer');
        const progress = player.querySelector('.progress');
        const progressBar = player.querySelector('.progress-filled');
        const toggle = player.querySelector('.toggle');
        const skipButtons = player.querySelectorAll('[data-skip]');
        const ranges = player.querySelectorAll('.player-slider');
        const volumeBtn = player.querySelectorAll('.volume');
        const fullScreenBtn = player.querySelector('.fullscreen');
        const volume = player.querySelector('#mSvg');
        const svgSoundbar = `<svg xmlns="http://www.w3.org/2000/svg" 
        xml:space="preserve" width="42.3316mm" height="44.9786mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 4233.16 4497.86" xmlns:xlink="http://www.w3.org/1999/xlink">
         <defs><style type="text/css">
           <![CDATA[
            .str0 {stroke:#fff;stroke-width:20;stroke-miterlimit:22.9256}
            .fil0 {fill:#fff}
           ]]></style></defs>
         <g id="Capa_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer"/>
          <rect class="fil0 str0" x="304.18" y="224.87" width="502.71" height="2460.62"/>
          <rect class="fil0 str0" x="1097.93" y="224.87" width="502.71" height="3492.5"/>
          <rect class="fil0 str0" x="1891.68" y="224.87" width="502.71" height="4021.67"/>
          <rect class="fil0 str0" x="2685.43" y="224.87" width="502.71" height="2963.33"/>
          <rect class="fil0 str0" x="3479.18" y="224.87" width="502.71" height="2116.66"/>
         </g></svg>`;
        let i = 0; 
        for (let i = 0; i < 6; i++) {
            if (i % 2 == 0) {
                $playlist.append($(`<div id="a-${i}"">
                <p>${i + 1}. ${mediaData.audio[i].title}<br/>
                ${mediaData.audio[i].artist}</p>                
                <span class="icon-a"></span><span class="nowPlaying"><span></div>`));
                allItems.push(mediaData.audio[i]);
            } else {
                $playlist.append($(`<div id="v-${i}">
                <p>${i + 1}. ${mediaData.video[i].name}<br/>
                ${mediaData.video[i].author}</p>          
                <span class="icon-v"></span><span class="nowPlaying"><span></div>`));
                allItems.push(mediaData.video[i]);
            }
        }

        $playlist.children('div').click(function () {
            let $video = $('video');
                $playlist.children('div').each(function (i, e) {
                        if ($(e).attr('id').substr(0, 1) === 'a') {
                            $(e).removeClass('selected');                    
                        } else {
                            $(e).removeClass('selected');
                        }
                        $(e).children('span.nowPlaying').children().remove();
                    });

                if ($(this).attr('id').substr(0, 1) === 'a') {
                    $(this).addClass('selected');
                } else {
                    $(this).addClass('selected');
                    // $(this).children('span').addClass('icon-v');
                }
                $(this).children('span.nowPlaying').append(svgSoundbar);
                

                let item = $(this).attr('id').split('-');
                $video.children().remove();
                if (item[0] === 'v'){
                    if(allItems[item[1]].author === 'NASA-Imagery'){
                        $video.append(`<source src="${allItems[item[1]].sd}.mp4" type="video/mp4"  media="(max-width:768px)">`);
                        $video.append(`<source src="${allItems[item[1]].sd}.webm" type="video/webm">`);
                        $video.append(`<source src="${allItems[item[1]].sd}.ogv" type="video/ogg">`);
                    }
                    $video.append(`<source src="${allItems[item[1]].hd}.mp4" type="video/mp4">`);
                    $video.attr('poster', '');
                } else {
                    $video.append(`<source src="${allItems[item[1]].song}" type="audio/mp3">`);
                    
                    $video.attr('poster', allItems[item[1]].poster);
                }
                i = item[1];
                viewer.load();                
                viewer.play();
            });

            init();
            function init() {
                $playlist.children('div').eq(0).click();                
            }

        //#endregion #region - Player
        const svgPlay = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="26mm" height="32mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 2600 3200" xmlns:xlink="http://www.w3.org/1999/xlink">
         <g id="Capa_x0020_1">
          <g id="_1961144049168">
           <path id="svg_4" class="fil1 str0" d="M435 105l616 410c186,124 490,326 675,450l616 410c186,124 186,326 0,450l-616 410c-186,124 -490,326 -675,450l-616 410c-186,124 -338,22 -338,-225l0 -2540c0,-248 152,-349 338,-225l0 0 0 0z"/>
          </g></g></svg>`;
        const svgPause = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="22mm" height="26mm" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
        viewBox="0 0 2200 2600" xmlns:xlink="http://www.w3.org/1999/xlink">
         <g id="Capa_x0020_1"><g id="_1961137916432">
           <path id="svg_6" class="fil1 str0" d="M217 57l486 0 0 0c64,0 115,550 115,1230 0,679 -52,1230 -115,1230l-486 0 0 0c-64,0 -115,-550 -115,-1230 0,-679 52,-1230 115,-1230z"/>
           <path id="svg_7" class="fil1 str0" d="M1464 57l486 0 0 0c64,0 115,550 115,1230 0,679 -52,1230 -115,1230l-486 0 0 0c-64,0 -115,-550 -115,-1230 0,-679 52,-1230 115,-1230z"/>
          </g></g></svg>`;

        viewer.addEventListener('click', togglePlay, false);
        viewer.addEventListener('play', updateButton, false);
        viewer.addEventListener('pause', updateButton, false);
        viewer.addEventListener('timeupdate', handleProgress, false);
        toggle.addEventListener('click', togglePlay, false);
        fullScreenBtn.addEventListener('click', fullScreen, false);
        skipButtons.forEach(button => button.addEventListener('click', skip, false));
        ranges.forEach(ranges => ranges.addEventListener('change', handRangeUpdate, false));
        ranges.forEach(ranges => ranges.addEventListener('mousemove', handRangeUpdate, false));
        let mousedown = false;
        progress.addEventListener('click', scrub, false);
        progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
        progress.addEventListener('mousedown', () => mousedown = true);
        progress.addEventListener('mouseup', () => mousedown = false);
        viewer.addEventListener('ended', function () {
            i = ++i < allItems.length ? i : 0;
            $playlist.children('div').eq(i).click();
        }, true);

        function togglePlay() {
            viewer[viewer.paused
                    ? 'play'
                    : 'pause']();
        }

        function updateButton() {
            $toggle = $('.toggle');
            const icon = this.paused ? svgPlay : svgPause;
            $toggle.children().remove();
            $toggle.append(icon);
        }

        function skip() {
            viewer.currentTime += parseFloat(this.dataset.skip);
        }

        function handRangeUpdate() {
            viewer[this.name] = this.value/100;
        }

        function handleProgress() {
            const percent = (viewer.currentTime / viewer.duration) * 100;
            progressBar.style.flexBasis = `${percent}%`;
        }

        function scrub(e) {
            const scrubTime = (e.offsetX / progress.offsetWidth) * viewer.duration;
            viewer.currentTime = scrubTime;
        }

        function fullScreen() {
            if (viewer.requestFullScreen) {
                viewer.requestFullScreen();
            } else if (viewer.webkitRequestFullScreen) {
                viewer.webkitRequestFullScreen();
            } else if (viewer.mozRequestFullScreen) {
                viewer.mozRequestFullScreen();
            }
        }

        // Volume control

        function setVolumeSVG(percent) {
            var svg = document.getElementById('mSvg');
            var barWidth = (percent/100) * svg.width.baseVal.value;
            var barHeight = (percent/100) * svg.height.baseVal.value;
            
            var msg = "0,"+svg.height.baseVal.value + " " 
                    + barWidth + "," + (svg.height.baseVal.value-barHeight) + " " 
                    + barWidth + "," + svg.height.baseVal.value;
            document.getElementsByClassName('barSlider')[0].setAttribute('points', msg);
        }
        volume.addEventListener('click', scrubVol, false);        
        volume.addEventListener('mousemove', (e) => mousedown && scrubVol(e));
        volume.addEventListener('mousedown', () => mousedown = true);
        volume.addEventListener('mouseup', () => mousedown = false);
        volume.addEventListener('mousewheel', scrubVol, false);

        function scrubVol(evt) {
            let vol; 
            if(evt.type !== 'mousewheel')
                vol = (evt.offsetX * 100) / 125;
            else
                if(evt.deltaY < 0){
                    if((viewer.volume * 100) < 100){
                    vol = (viewer.volume * 100) + 1;
                    }
                } else{
                    if((viewer.volume * 100) > 0){
                        vol = (viewer.volume * 100) - 1;
                    }
                }
            viewer.volume = vol / 100;
            setVolumeSVG(vol);
            
            if( $video.prop('muted') ) {
                $video.prop('muted', false);
                $("#mute").removeClass('icon-muted');            
                $("#mute").addClass('icon-unmuted');
              }
        }

        if ($video.prop('muted', false)){
            $("#mute").addClass('icon-unmuted');
          }
      
        $("#mute").click( function (){
          if( $video.prop('muted') ) {
            $video.prop('muted', false);
            $("#mute").removeClass('icon-muted');            
            $("#mute").addClass('icon-unmuted');
          } else {
            $video.prop('muted', true);
            $("#mute").removeClass('icon-unmuted');
            $("#mute").addClass('icon-muted');
          }
        });

        //#endregion

        $('.svg')
            .hover(function () {
                var el = $(this);
                var svg = el.find('svg path');
                el
                    .find('svg')
                    .addClass('hover');
            }, function () {
                var el = $(this);
                var svg = el.find('svg path');
                el
                    .find('svg')
                    .removeClass('hover');
            });

    });

// const buttons = {}; buttons.play = $(''); // Initialte variables const video
// = document.querySelector('video'); const playbackDuration =
// document.querySelector('.playback-duration'); const progressBar =
// document.querySelector('.progress-bar'); const progressBarBackground =
// document.querySelector('.progress-bar-background'); const clip = {}; const
// buttons = {}; // Function to convert a date object to 'mm:ss' format let
// toTimeString = date => {     let date2 = date         .toTimeString()
// .split(' ')[0];     date2 = date2.slice(3, 8);     return date2; } // Get
// buttons buttons.play = document.querySelector('.play'); buttons.pause =
// document.querySelector('.pause'); buttons.mute =
// document.querySelector('.mute'); buttons.unmute =
// document.querySelector('.unmute'); // By default, these shouldn't be
// displayed buttons.pause.style.display = 'none'; buttons.mute.style.display =
// 'none'; // Don't want to annoy visitors video.volume = 1; // Show duration
// when video is ready to play video.onloadeddata = _ => {     let duration =
// new Date(0, 0, 0, 0, 0, 0, video.duration * 1000);     playbackDuration
// .querySelector('.duration')         .innerHTML = toTimeString(duration); } //
// Set actions on buttons buttons.play.onclick = _ => video.play();
// buttons.pause.onclick = _ => video.pause(); buttons.mute.onclick = _ =>
// video.volume = 1; buttons.unmute.onclick = _ => video.volume = 0; // Toggle
// buttons when played / paused video.onplay = _ => { buttons.play.style.display
// = 'none';     buttons.pause.style.display = 'block'; } video.onpause = _ => {
//     buttons.play.style.display = 'block';   buttons.pause.style.display =
// 'none'; } // Toggle mute buttons when volume changes video.onvolumechange = _
// => {     if (video.volume == 0) { buttons.mute.style.display = 'block';
// buttons.unmute.style.display = 'none';     } else {
// buttons.mute.style.display = 'none'; buttons.unmute.style.display = 'block';
// } } // Change video location when user clicks on progress bar
// progressBarBackground.onclick = event => { let positionRatio = event.offsetX
// / progressBarBackground.offsetWidth; video.currentTime = video.duration *
// positionRatio; } // update display as video seeks video.ontimeupdate = _ => {
//     // Update progress bar     let durationRatio = video.currentTime /
// video.duration; progressBar.style.width = durationRatio * 100 + '%';     //
// Update playback duration     let currentTime = new Date(0, 0, 0, 0, 0, 0,
// video.currentTime * 1000);     currentTime = toTimeString(currentTime);
// playbackDuration    .querySelector('.progress')         .innerHTML =
// currentTime; }