const https = require("https");

const query = encodeURIComponent("fernando botero painting");
const url = `https://html.duckduckgo.com/html/?q=${query}&ia=images`;

https.get(url, (res) => {
  let body = "";
  res.on("data", chunk => body += chunk);
  res.on("end", () => {
    console.log(body.substring(0, 1000));
    // extract anything that looks like an image URL, like src="https://..."
    const images = body.match(/src="([^"]+\.jpg)"/g);
    if(images) console.log(images.slice(0, 10).join("\n"));
  });
});
