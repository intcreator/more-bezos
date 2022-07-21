// listen for messages saying a purchase was made
chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if(request?.amazonOrderSubmitted) {
            // create new tab in a small window on top of everything so there's not a huge flash
            const bezosWindow = await chrome.windows.create({
                height: 100,
                width: 100,
            });
            const bezosWindowTabs = await chrome.tabs.query({
                active: true,
                windowId: bezosWindow.id,
            });
            const bezosTab = bezosWindowTabs.length ? bezosWindowTabs[0] : undefined;
            // update the tab in the new window to start playing Bezos I
            chrome.tabs.update({
                url: 'https://www.youtube.com/watch?v=7_EeCkHs-e0',
            });
            // give a couple seconds for YouTube to load then move the tab to right after the Amazon order
            setTimeout(() => {
                chrome.tabs.move(bezosTab.id, {
                    index: sender.tab.index + 1,
                    windowId: sender.tab.windowId,
                })
            }, 2000);

            // close the tab after 70 seconds (the song is about 60 seconds long + a few seconds for buffering)
            setTimeout(() => {
                chrome.tabs.query({
                    url: 'https://www.youtube.com/watch?v=7_EeCkHs-e0*',
                }, (tabs) => {
                    if(!tabs.length) return;
                    chrome.tabs.remove(tabs[0].id);
                })
            }, 75 * 1000);
        }
    }
);
