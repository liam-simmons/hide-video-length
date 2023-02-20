import * as Settings from './utilities/settings';

/**
 * Hides video lengths on YouTube based on certain text values.
 *
 * @param {string} parentSelector - The CSS selector for the parent element that contains the video lengths to be hidden.
 * @param {string} checkSelector - The CSS selector for the element that displays the video length.
 * @param {string} hideSelector - The CSS selector for the element(s) that should be hidden when a match is found.
 * @param {string[]} searchTexts - An array of text values to search for in the video length element.
 * @param {boolean} [exactMatch=false] - A boolean value indicating whether an exact match is required to hide an element.
 */
async function hideVideoLengths(
  parentSelector: string,
  checkSelector: string,
  hideSelector: string,
  searchTexts: string[],
  exactMatch = false,
) {
  const parentElements = document.querySelectorAll(parentSelector);

  parentElements.forEach((parentElement) => {
    const elementText = (parentElement.querySelector(checkSelector)?.textContent || '').toLowerCase();

    searchTexts.forEach((searchText) => {
      // Don't check for empty strings for example
      if (!searchText) {
        return;
      }

      searchText = searchText.toLowerCase();

      const isMatch = exactMatch ? elementText === searchText : elementText.includes(searchText);

      if (isMatch) {
        parentElement.querySelectorAll(hideSelector)?.forEach((element) => element.classList.add('hidden'));
      }
    });
  });
}

async function checkYoutube(): Promise<void> {
  if (!(await Settings.get('activated'))) {
    return;
  }

  const toHideTitles = await Settings.get('youtubeVideoTitles');

  if (typeof toHideTitles === 'string') {
    const toHide = toHideTitles.split('\n');

    hideVideoLengths('ytd-grid-video-renderer', '#video-title', 'ytd-thumbnail-overlay-time-status-renderer', toHide);
    hideVideoLengths(
      'ytd-watch-flexy',
      '#above-the-fold #title h1 yt-formatted-string',
      '.ytp-progress-bar-container, .ytp-time-separator, .ytp-time-duration, .video-time',
      toHide,
    );
  }

  const toHideChannels = await Settings.get('youtubeChannelNames');

  if (typeof toHideChannels === 'string') {
    const toHide = toHideChannels.split('\n');

    hideVideoLengths(
      'ytd-grid-video-renderer',
      'yt-formatted-string.ytd-channel-name a.yt-simple-endpoint',
      'ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );
    hideVideoLengths(
      'ytd-watch-flexy',
      '#above-the-fold yt-formatted-string.ytd-channel-name .yt-simple-endpoint',
      '.ytp-progress-bar-container, .ytp-time-separator, .ytp-time-duration, .video-time',
      toHide,
    );
  }
}

setInterval(checkYoutube, 500);
