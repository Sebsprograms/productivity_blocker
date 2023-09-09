await chrome.runtime.onInstalled.addListener(async () => {
    const urlsKey = "blockedUrls";

    // Retrieve the list of blocked domains from chrome.storage.local
    await chrome.storage.local.get([urlsKey], async function (result) {
        const blockedDomains = result[urlsKey] || [];

        // Add a listener to block requests to the specified domains and their subpaths
        await chrome.webRequest.onBeforeRequest.addListener(
            function (details) {
                return { cancel: true };
            },
            {
                urls: blockedDomains.map((domain) => `*://*.${domain}/*`),
                types: ["main_frame"],
            },
            ["blocking"]
        );
    });
});
