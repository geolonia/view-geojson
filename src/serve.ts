import http from "http";
import openBrowser from "open";

const port = parseInt(process.env.PORT || '8080', 10)
const url = `http://127.0.0.1:${port}`;

const serve = (data: string) => {
  let geojson: any
  try {
    geojson = JSON.parse(data)
  } catch (error) {
    throw new Error('Invalid GeoJSON.')
  }

  const server = http.createServer((request, response) => {
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
        padding: 0;
        margin: 0;
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="geolonia" data-geojson="${url}/data.geojson"></div>
    <script src="https://cdn.geolonia.com/v1/embed?geolonia-api-key=YOUR-API-KEY"></script>
  </body>
</html>

      `);
      response.end();
    }
  });

  server.listen(port, () => {
    console.log(`Receiving: ${geojson}`)
    console.log(`Serving at ${url}...`);
    openBrowser(url);
  });
};

export default serve;
