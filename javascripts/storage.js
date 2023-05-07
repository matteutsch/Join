const STORAGE_TOKEN = 'HT0S0N13Y0K6B2YIWFIVXQ2L8P2T85JJ2LNGCLH0'
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item'



async function setItem(key, value){
    const payload = { key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload)})
    .then(res => res.json())
}

async function getItem(key){
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => res.data.value);
}