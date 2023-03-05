import * as Settings from './utilities/settings';
import * as Prefixing from './utilities/prefixing';
import Observer from './content/Observer';
import { throttledRun } from './content/checkers';

let activated = !!Settings.get('activated');

const observer = new Observer();

if (activated) {
  onActivate();
}

// Listen for changes
Settings.addListener('activated', function (key, newValue) {
  activated = !!newValue;

  newValue ? onActivate() : onDeactivate();
});

Settings.addListener(['youtubeChannelNames', 'youtubeVideoTitles'], function () {
  if (activated) {
    throttledRun(true);
  }
});

function onActivate() {
  document.body.classList.add(`${Prefixing.prefix('active')}`);
  throttledRun();
  observer.start();
}

function onDeactivate() {
  document.body.classList.remove(`${Prefixing.prefix('active')}`);
  observer.stop();
}

// Styles
const styleElement = document.createElement('style');
styleElement.textContent = `body.${Prefixing.prefix('active')} .${Prefixing.prefix(
  'hidden',
)} { display: none !important; }`;
document.body.appendChild(styleElement);
