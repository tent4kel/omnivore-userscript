// ==UserScript==
// @name         Dynamic Page Turner for Omnivore
// @namespace    http://tampermonkey.net/
// @version      0.8
// @description  Add/remove page turning zones dynamically based on URL changes
// @author       Your Name
// @match        https://omnivore.app/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let leftZone, rightZone;

// Function to scroll the viewport
function scrollViewport(direction) {
    const height = window.innerHeight;
    const scrollPosition = window.pageYOffset;
    const totalPageHeight = document.body.scrollHeight;

    // Check if at the bottom of the page
    if (direction === 'forward' && scrollPosition + height >= totalPageHeight) {
        // Trigger back action
        window.history.back();
    } else {
        // Normal scroll behavior
        window.scrollBy({
            top: direction === 'forward' ? height : -height,
            behavior: 'smooth'
        });
    }
}


    // Function to add tapping zones
    function addTappingZones() {
        // Create left and right tapping zones if they don't exist
        if (!leftZone || !rightZone) {
            leftZone = document.createElement('div');
            rightZone = document.createElement('div');

// Apply styles to the zones
[leftZone, rightZone].forEach((zone, index) => {
    zone.style.position = 'fixed';
    zone.style.bottom = '0';
    zone.style.height = '33%'; // Cover bottom third of the screen
    zone.style.width = '50%';
    zone.style.zIndex = '9999'; // High z-index to ensure it's on top
    zone.style.opacity = '0.5'; // Semi-transparent for visibility
    zone.style.cursor = 'pointer';
    zone.style.left = index === 0 ? '0' : '50%';

    // Reset all borders
    zone.style.border = 'none';

    // Apply left border for left zone and right border for right zone
    if (index === 0) {
        // Left zone
        zone.style.borderLeft = '2px solid red';
    } else {
        // Right zone
        zone.style.borderRight = '2px solid blue';
    }

    document.body.appendChild(zone);
});


            // Add event listeners for scrolling
            leftZone.addEventListener('click', () => scrollViewport('backward'));
            rightZone.addEventListener('click', () => scrollViewport('forward'));
        }
    }

    // Function to remove tapping zones
    function removeTappingZones() {
        if (leftZone && rightZone) {
            leftZone.remove();
            rightZone.remove();
            leftZone = null;
            rightZone = null;
        }
    }

    // Function to update zones based on URL
    function updateZonesBasedOnURL() {
        if (window.location.pathname === '/home') {
            removeTappingZones();
        } else {
            addTappingZones();
        }
    }

    // Observe DOM changes
    const observer = new MutationObserver(mutations => {
        updateZonesBasedOnURL();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial check
    updateZonesBasedOnURL();
})();
