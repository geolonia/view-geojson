import http from "http";
import openBrowser from "open";
import fs from "fs";

const serve = (data: string) => {
  const server = http.createServer((request, response) => {
    console.log(request.url);
    if (request.url === "/data.geojson") {
      response.setHeader("content-type", "application/json");
      response.write(data);
      response.end();
    } else {
      response.setHeader("content-type", "text/html");
      response.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      html,
      body,
      .geolonia {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="geolonia" data-geojson="data.geojson"></div>
    <script src="https://api.geolonia.com/dev/embed?geolonia-api-key=YOUR-API-KEY"></script>
  </body>
</html>

      `);
      response.end();
    }
  });

  server.listen(8080, () => {
    const url = `http://127.0.0.1:8080`;
    console.log(`Serving at ${url}...`);
    openBrowser(url);
  });
};

export default serve;
