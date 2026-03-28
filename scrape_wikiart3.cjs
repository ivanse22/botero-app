const https = require('https');
const titles = [
    'the-president-s-family-1967',
    'dancing-in-colombia-1980',
    'man-and-woman-1989',
    'maternity-1989',
    'bailadora-de-flamenco-2001',
    'self-portrait-with-louis-xiv-after-rigaud-1973'
];
let count = 0;
titles.forEach(t => {
    https.get(`https://www.wikiart.org/en/fernando-botero/${t}`, r2 => {
        let b2 = '';
        r2.on('data', c => b2 += c);
        r2.on('end', () => {
            const match = b2.match(/https:\/\/uploads\d*.wikiart.org\/[^"]+!Large.jpg/g);
            if (match) console.log(match[0]);
            count++;
            if (count === titles.length) process.exit(0);
        });
    });
});
