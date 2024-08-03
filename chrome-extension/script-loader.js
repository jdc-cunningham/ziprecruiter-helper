const scriptsToLoad = [
  'block.js',
  'lijfce.js'
];

scriptsToLoad.forEach(script => {
  var s = document.createElement('script');

  s.src = chrome.extension.getURL(script);

  (document.head||document.documentElement).appendChild(s);

  s.onload = function() {
    s.parentNode.removeChild(s);
  };
});
