const blockButton = document.getElementById('block-btn');
const testButton = document.getElementById('test-btn');


blockButton.addEventListener('click', async () => {
    console.log('block button clicked');
    await saveCurrentTabUrl();
})

testButton.addEventListener('click', async () => {
    console.log('test button clicked');
    await getUrl(generateKey());
});

async function saveCurrentTabUrl() {
    await chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
        const activeTab = tabs[0];
        const activeTabUrl = activeTab.url;

        await saveUrl(activeTabUrl);


    });
}

// We want to save the url to chrome storage
async function saveUrl(url) {
    const key = generateKey();

    // Url is saved as a key value pair
    // The key is an int exactly like a 0 indexed array & the value is the url.
    await chrome.storage.local.set({ [key]: url }).then(() => {
        console.log("Value is set");
    });
}

async function getUrl(key) {
    await chrome.storage.local.get([key]).then((result) => {
        console.log("Value currently is " + result[key]);
    });
}


function generateKey() {
    return 'testKey';
}