const { clipboard, ipcRenderer } = require('electron');

const clippingsList = document.getElementById('clippings-list');
const copyFromClipboardButton = document.getElementById('copy-from-clipboard');

ipcRenderer.on('create-new-clipping', () => {
  addClippingToList();
  new Notification('Clipping Added', {
    body: `${clipboard.readText()}`,
  });
});

ipcRenderer.on('write-to-clipboard', () => {
  const clipping = clippingsList.firstChild;
  writeToClipboard(getClippingText(clipping));
  new Notification('Clipping Copied', {
    body: `${clipboard.readText()}`,
  });
});

const createClippingElement = clippingText => {
  const clippingElement = document.createElement('article');

  clippingElement.classList.add('clippings-list-item');

  clippingElement.innerHTML = `
    <div class="clipping-text" disabled="true"></div>
    <div class="clipping-controls">
      <button class="copy-clipping">&rarr; Clipboard</button>
      <button class="remove-clipping">Remove</button>
    </div>
  `;

  clippingElement.querySelector('.clipping-text').innerText = clippingText;

  return clippingElement;
};

const addClippingToList = () => {
  const clippingText = clipboard.readText();
  const clippingElement = createClippingElement(clippingText);
  clippingsList.prepend(clippingElement);
};

copyFromClipboardButton.addEventListener('click', addClippingToList);

clippingsList.addEventListener('click', event => {
  const hasClass = className => event.target.classList.contains(className);

  const clippingListItem = getButtonParent(event);

  if (hasClass('remove-clipping')) removeClipping(clippingListItem);
  if (hasClass('copy-clipping'))
  {writeToClipboard(getClippingText(clippingListItem));}
});

const removeClipping = target => {
  target.remove();
};

const writeToClipboard = clippingText => {
  clipboard.writeText(clippingText);
};

const getButtonParent = ({ target }) => {
  return target.parentNode.parentNode;
};

const getClippingText = clippingListItem => {
  return clippingListItem.querySelector('.clipping-text').innerText;
};
