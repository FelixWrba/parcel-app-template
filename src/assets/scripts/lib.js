/**
 * Get the first element that matches the given selectors
 * @param {string} selector
 * @returns {HTMLElement}
 */
export function $(selector) {
    return document.querySelector(selector);
}
