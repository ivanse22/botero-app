const https = require('https');
https.get('https://www.wikiart.org/en/fernando-botero/all-works/text-list', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const urls = body.match(/\/en\/fernando-botero\/[^"]+/g);
    console.log(urls.slice(0, 15).join('\n'));
  });
});
