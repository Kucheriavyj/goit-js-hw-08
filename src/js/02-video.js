import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);
const CURRENT_TIME_KEY = 'videoplayer-current-time';

const isNotEmpryStorage = localStorage.getItem(CURRENT_TIME_KEY);

if (isNotEmpryStorage) {
  onSetCurrentVideoTime();
};

player.on('timeupdate', throttle(onGetCurrentVideoTime, 1000));

function onGetCurrentVideoTime(event) {
  localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(event.seconds));
};

function onSetCurrentVideoTime() {
  player.setCurrentTime(JSON.parse(localStorage.getItem(CURRENT_TIME_KEY)));
};