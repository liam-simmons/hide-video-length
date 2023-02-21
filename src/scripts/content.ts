import * as Settings from './utilities/settings';
import * as Prefixing from './utilities/prefixing';
import { throttle } from 'lodash';

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
        parentElement
          .querySelectorAll(hideSelector)
          ?.forEach((element) => element.classList.add(Prefixing.prefix('hidden')));
      }
    });
  });
}

async function checkYoutube(): Promise<void> {
  console.log('check youtube');
  if (!(await Settings.get('activated'))) {
    return;
  }

  const toHideTitles = await Settings.get('youtubeVideoTitles');

  if (typeof toHideTitles === 'string') {
    const toHide = toHideTitles.split('\n');

    // Home
    hideVideoLengths('ytd-rich-grid-media', '#video-title-link', 'ytd-thumbnail-overlay-time-status-renderer', toHide);

    // Subscriptions
    hideVideoLengths('ytd-grid-video-renderer', '#video-title', 'ytd-thumbnail-overlay-time-status-renderer', toHide);

    // Video page
    hideVideoLengths(
      'ytd-watch-flexy',
      '#above-the-fold #title h1 yt-formatted-string',
      '.ytp-progress-bar-container, .ytp-time-separator, .ytp-time-duration, .video-time',
      toHide,
    );

    // Search
    hideVideoLengths(
      'ytd-video-renderer',
      '#video-title yt-formatted-string',
      '#overlays ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );

    // Playlists
    hideVideoLengths(
      'ytd-playlist-video-renderer',
      '#video-title',
      '#overlays ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );

    // Sidebar
    hideVideoLengths(
      'ytd-compact-video-renderer',
      '#video-title',
      '#overlays ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );
  }

  const toHideChannels = await Settings.get('youtubeChannelNames');

  if (typeof toHideChannels === 'string') {
    const toHide = toHideChannels.split('\n');

    // Home
    hideVideoLengths(
      'ytd-rich-grid-media',
      '.ytd-channel-name .yt-simple-endpoint',
      'ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );

    // Subscriptions
    hideVideoLengths(
      'ytd-grid-video-renderer',
      'yt-formatted-string.ytd-channel-name .yt-simple-endpoint',
      'ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );

    // Video page
    hideVideoLengths(
      'ytd-watch-flexy',
      '#above-the-fold yt-formatted-string.ytd-channel-name .yt-simple-endpoint',
      '.ytp-progress-bar-container, .ytp-time-separator, .ytp-time-duration, .video-time',
      toHide,
    );

    // Search
    hideVideoLengths(
      'ytd-video-renderer',
      'yt-formatted-string.ytd-channel-name .yt-simple-endpoint',
      '#overlays ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );

    // Playlists
    hideVideoLengths(
      'ytd-playlist-video-renderer',
      'yt-formatted-string.ytd-channel-name .yt-simple-endpoint',
      '#overlays ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );

    // Sidebar
    hideVideoLengths(
      'ytd-compact-video-renderer',
      'yt-formatted-string.ytd-channel-name',
      '#overlays ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );

    // Visiting channel
    hideVideoLengths(
      'ytd-browse[page-subtype="channels"]',
      'yt-formatted-string.ytd-channel-name',
      '#overlays ytd-thumbnail-overlay-time-status-renderer',
      toHide,
    );
  }
}

const throttledRun = throttle(checkYoutube, 500);
const triggeredNodes = new Set();

// Create a new MutationObserver object
const observer = new MutationObserver(function (mutations) {
  // Loop through each mutation that was observed
  outerLoop: for (const mutation of mutations) {
    // Check if any nodes were added or removed from the page
    if (mutation.type === 'childList') {
      for (const node of Array.from(mutation.addedNodes)) {
        // Only worry about nodes that we want to check
        if (
          node instanceof Element &&
          node.matches(
            'ytd-rich-grid-media, ytd-grid-video-renderer, ytd-watch-flexy, ytd-video-renderer, ytd-playlist-video-renderer, ytd-compact-video-renderer',
          )
        ) {
          // Don't repeat the process for nodes
          if (!triggeredNodes.has(node)) {
            triggeredNodes.add(node);
            throttledRun();
            break outerLoop;
          }
        }
      }
    }
  }
});

// Styles
const styleElement = document.createElement('style');
styleElement.textContent = `.${Prefixing.prefix('hidden')} { display: none !important; }`;
document.body.appendChild(styleElement);

// Start observing changes to the DOM
observer.observe(document, { childList: true, subtree: true });
