import * as Settings from '../utilities/settings';
import { hideVideoLengths, unhideAllVideoLengths } from './utilities';
import { throttle } from 'lodash';

export async function checkYoutube(reset = false): Promise<void> {
  console.log('checking youtube');
  if (!Settings.get('activated')) {
    return;
  }

  if (reset) {
    unhideAllVideoLengths();
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

export const throttledRun = throttle(checkYoutube, 500);
