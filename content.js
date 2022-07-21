document.querySelector('#submitOrderButtonId').addEventListener('click', () => {
    // tell background script to play Bezos I
    chrome.runtime.sendMessage({
        amazonOrderSubmitted: true,
    })
});
