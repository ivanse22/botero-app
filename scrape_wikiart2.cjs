const https = require('https');

https.get('https://www.wikiart.org/en/fernando-botero/all-works/text-list', res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        // get a few popular ones
        const titles = [
            'mona-lisa-at-the-age-of-twelve-years',
            'the-presidential-family',
            'the-musicians',
            'dancing-in-colombia',
            'still-life-with-watermelon',
            'the-bath'
        ];
        let count = 0;
        titles.forEach(t => {
            https.get(`https://www.wikiart.org/en/fernando-botero/${t}`, r2 => {
                let b2 = '';
                r2.on('data', c => b2 += c);
                r2.on('end', () => {
                    const match = b2.match(/https:\/\/uploads\d*.wikiart.org\/[^"]+\.jpg/g);
                    if (match) console.log(match[0]);
                    count++;
                    if (count === titles.length) process.exit(0);
                });
            });
        });
    });
});
