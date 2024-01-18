// ==UserScript==
// @name         Global Page Turner Zones
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  Add page turning zones at the bottom of the screen
// @author       Your Name
// @match        https://omnivore.app/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to scroll the viewport
    function scrollViewport(direction) {
        const height = window.innerHeight;
        window.scrollBy({
            top: direction === 'forward' ? height : -height,
            behavior: 'smooth'
        });
    }

    // Create left and right tapping zones
    const leftZone = document.createElement('div');
    const rightZone = document.createElement('div');

    // Apply styles to the zones
    [leftZone, rightZone].forEach((zone, index) => {
        zone.style.position = 'fixed';
        zone.style.bottom = '0';
        zone.style.height = '33%'; // Cover bottom third of the screen
        zone.style.width = '50%';
        zone.style.border = '2px dashed red'; // Debugging border
        zone.style.zIndex = '9999'; // High z-index to ensure it's on top
        zone.style.opacity = '0.5'; // Semi-transparent for visibility
        zone.style.cursor = 'pointer';
        zone.style.left = index === 0 ? '0' : '50%';
        document.body.appendChild(zone);
    });

    // Add event listeners for scrolling
    leftZone.addEventListener('click', () => scrollViewport('backward'));
    rightZone.addEventListener('click', () => scrollViewport('forward'));

    console.log('Global page turning zones added.');
})();
