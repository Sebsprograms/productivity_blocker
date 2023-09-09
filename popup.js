const urlsKey = 'blockedUrls';
const timeKey = 'time';
await initCollections();
await updateView();

const blockButton = document.getElementById('block-btn');


blockButton.addEventListener('click', async () => {
    await getAndSaveCurrentTabUrl();
});

// We want to initialize an empty urls array if it doesn't exist
async function initCollections() {
    await chrome.storage.local.get([urlsKey]).then(async (result) => {
        if (!result[urlsKey]) {
            await chrome.storage.local.set({ [urlsKey]: [] });
        }
    });
    await chrome.storage.local.get([timeKey]).then(async (result) => {
        if (!result[timeKey]) {
            await chrome.storage.local.set({ [timeKey]: '' });
        }
    });
}

// Update the contents of our unordered list with the urls
async function updateView() {
    await chrome.storage.local.get([urlsKey], function (result) {
        const urls = result[urlsKey];
        const outerContainer = document.getElementById('urls-list');
        outerContainer.innerHTML = '';
        urls.forEach(url => {
            const container = document.createElement('div');
            container.className = 'url-container';

            // Add the url to the container first
            const a = document.createElement('a');
            a.className = 'url';
            a.href = url;
            a.target = '_blank';
            a.innerText = url;
            container.appendChild(a);

            // Add a delete button
            const img = document.createElement('img');
            img.src = 'images/delete.png';
            img.className = 'icon';
            img.addEventListener('click', async () => {
                await deleteOneUrl(url);
            });

            container.appendChild(img);
            outerContainer.appendChild(container);
        });
    });
}

async function deleteOneUrl(url) {
    await chrome.storage.local.get([urlsKey], async function (result) {
        const urls = result[urlsKey];
        const index = urls.indexOf(url);
        urls.splice(index, 1);
        await chrome.storage.local.set({ [urlsKey]: urls });
    });

    setTimeout(async () => {
        await updateView();
    }, 10);

}

async function getAndSaveCurrentTabUrl() {
    await chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        const activeTab = tabs[0];
        const activeTabUrl = activeTab.url;

        await saveUrl(activeTabUrl);
    });
}

// We want to save the url to chrome storage
async function saveUrl(url) {
    const sanitizedUrl = cleanBaseUrl(url);
    await chrome.storage.local.get([urlsKey]).then(async (result) => {
        const urls = result[urlsKey];
        if (!urls.includes(sanitizedUrl)) {
            await chrome.storage.local.set({ [urlsKey]: [sanitizedUrl, ...urls] });
        }
    });
    await updateView();
}

function cleanBaseUrl(url) {
    // Use a regular expression to capture the base URL and optional query parameters
    const regex = /^(https?:\/\/[^/?#]+).*$/i;

    // Use the replace method to extract the base URL
    const cleanedUrl = url.replace(regex, '$1');

    return cleanedUrl;
}