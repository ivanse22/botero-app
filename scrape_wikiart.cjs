const https = require('https');

https.get('https://www.wikiart.org/en/fernando-botero/all-works', res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        const urls = body.match(/https:\/\/uploads[^\s"]+\.jpg/g);
        if (urls) {
            console.log(Array.from(new Set(urls)).slice(0, 15).join('\n'));
        }
    });
});
