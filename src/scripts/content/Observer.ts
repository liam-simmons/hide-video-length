import { throttledRun } from './checkers';

export default class Observer {
  isObserving = false;
  observer: MutationObserver;

  triggeredNodes: Set<unknown>;

  constructor() {
    this.triggeredNodes = new Set();

    this.observer = new MutationObserver((mutations) => {
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
              if (!this.triggeredNodes.has(node)) {
                this.triggeredNodes.add(node);
                throttledRun();
                break outerLoop;
              }
            }
          }
        }
      }
    });
  }

  start() {
    if (!this.isObserving) {
      console.log('start observing');
      this.observer.observe(document, { childList: true, subtree: true });
      this.isObserving = true;
    }
  }

  stop() {
    if (this.isObserving) {
      console.log('stop observing');
      this.observer.disconnect();
      this.isObserving = false;
    }
  }
}
