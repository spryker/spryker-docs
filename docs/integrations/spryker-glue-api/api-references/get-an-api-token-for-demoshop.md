---
title: Get an API Token for Demoshop
description: Get a API access token to use on the demoshops.
last_updated: August 19, 2025
template: default
search: exclude
---

To use the interactivity part of our API documentation you will need an API Access token. Here is how you can get a token and apply it to the API documentation for you to test out the APIs. Please choose the server which you want your API token for to test, and hit Get API token. These tokens expire in **8 hours** from the time that they are generated, and you can always come back to this page to see the api token that was generated for you for the server you chose. Happy Testing.

<label for="serverSelect">Choose server:</label>
<select id="serverSelect">
  <option value="B2CSF">B2C Storefront API</option>
  <option value="B2CBE">B2C Backend API</option>
  <option value="B2CMPSF">B2C Marketplace Storefront API</option>
  <option value="B2CMPBE">B2C Marketplace Backend API</option>
  <option value="B2BSF">B2B Storefront API</option>
  <option value="B2BBE">B2B Backend API</option>
  <option value="B2BMPSF">B2B Marketplace Storefront API</option>
  <option value="B2BMPBE">B2B Marketplace Backend API</option>
</select>

<button id="callWebhook">Get API token</button>
<button id="clearToken">Clear Token</button>

## Your API Token

<pre id="responseOutput"></pre>

## API Expiry

<pre id="expiryOutput"></pre>

<script>
  const serverSelect = document.getElementById('serverSelect');
  const button = document.getElementById('callWebhook');
  const clearButton = document.getElementById('clearToken');
  const output = document.getElementById('responseOutput');
  const expiry = document.getElementById('expiryOutput');
  const STORAGE_KEY = 'apiTokenData'; // object mapping server -> token data

  function getStoredTokens() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  function getStoredTokenForServer(server) {
    const tokens = getStoredTokens();
    const tokenData = tokens[server];
    if (!tokenData) return null;

    const now = Date.now();
    if (tokenData.expiry && now < tokenData.expiry) {
      return tokenData;
    } else {
      delete tokens[server];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
      return null;
    }
  }

  function storeTokenForServer(server, data) {
    const tokens = getStoredTokens();
    tokens[server] = data;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  }

  function clearTokenForServer(server) {
    const tokens = getStoredTokens();
    delete tokens[server];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
    renderState();
  }

  function renderState() {
    const server = serverSelect.value;
    const tokenData = getStoredTokenForServer(server);

    if (tokenData) {
      button.disabled = true;
      output.textContent = tokenData.access_token;
      const expiryDate = new Date(tokenData.expiry);
      expiry.textContent = expiryDate.toLocaleString();
      clearButton.disabled = false;
    } else {
      button.disabled = false;
      output.textContent = 'No active token.';
      expiry.textContent = '-';
      clearButton.disabled = true;
    }
  }

button.addEventListener('click', async () => {
  const server = serverSelect.value;
  const webhookUrl = `https://workflow.revops.spryker.com/webhook/spryker-api-token?server=${encodeURIComponent(server)}`;

  try {
    const res = await fetch(webhookUrl, { method: 'GET' });
    const text = await res.text();
    console.log('Raw webhook response:', text);

    // Parse the text manually
    const lines = text.split('\n');
    const tokenInfo = {};
    lines.forEach(line => {
      const [key, ...rest] = line.split(':');
      if (key && rest.length) {
        tokenInfo[key.trim()] = rest.join(':').trim();
      }
    });

    if (!tokenInfo.tokenexpiry || !tokenInfo.apitoken) {
      throw new Error('Unexpected response format');
    }

    const expiresInMs = parseInt(tokenInfo.tokenexpiry, 10) * 1000;
    const expiryTime = Date.now() + expiresInMs;

    storeTokenForServer(server, {
      access_token: tokenInfo.apitoken,
      expiry: expiryTime
    });

    renderState();
  } catch (error) {
    console.error(error);
    output.textContent = 'Error: ' + error;
    expiry.textContent = '-';
    button.disabled = false;
  }
});

  clearButton.addEventListener('click', () => {
    const server = serverSelect.value;
    clearTokenForServer(server);
  });

  serverSelect.addEventListener('change', renderState);

  // initialize UI
  renderState();
</script>