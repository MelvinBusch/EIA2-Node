import * as Http from "http";
import * as Url from "url";
import * as Database from "./database";

let port: number = process.env.PORT || 8100;
const server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
  _response.setHeader("Access-Control-Allow-Origin", "*");
  _response.setHeader("content-type", "text/html; charset=utf-8");
});

server.addListener("listening", () => console.log("Listening on Port: " + port));
server.addListener("request", handleRequest);
server.listen(port);

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
  
  let query: Interfaces.UrlObject = Url.parse(_request.url, true).query;
  let action: string = query["action"];

  switch (action) {

    // Insert Studi
    case "insert":
      let studi: Interfaces.Studi = JSON.parse(query["json"]);
      Database.insert(studi);
      respond(_response, "Student added!");
      break;

    // Refresh Studis
    case "refresh":
      Database.find(function(json: string): void {
        respond(_response, json);
      }, "*");
      break;

    // Search Studi
    case "search":
      let matrikel: string = JSON.parse(query["matrikel"].toString());
      Database.find(function(json: string): void {
        respond(_response, json);
      }, matrikel);
      break;

    default:
      respond(_response, "Unknown command: " + action);
      break;
  }

}

// Create Response
function respond(_response: Http.ServerResponse, _responseText: string): void {
  _response.setHeader("Access-Control-Allow-Origin", "*");
  _response.setHeader("content-type", "text/html; charset=utf-8");
  _response.write(_responseText);
  _response.end();
}
