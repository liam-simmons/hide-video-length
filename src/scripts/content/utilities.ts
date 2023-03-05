import * as Prefixing from '../utilities/prefixing';

export function unhideAllVideoLengths() {
  document.querySelectorAll(`.${Prefixing.prefix('hidden')}`).forEach((element) => {
    element.classList.remove(Prefixing.prefix('hidden'));
  });
}

/**
 * Hides video lengths on YouTube based on certain text values.
 *
 * @param {string} parentSelector - The CSS selector for the parent element that contains the video lengths to be hidden.
 * @param {string} checkSelector - The CSS selector for the element that displays the video length.
 * @param {string} hideSelector - The CSS selector for the element(s) that should be hidden when a match is found.
 * @param {string[]} searchTexts - An array of text values to search for in the video length element.
 * @param {boolean} [exactMatch=false] - A boolean value indicating whether an exact match is required to hide an element.
 */
export function hideVideoLengths(
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
