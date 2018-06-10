import * as Http from "http";
import * as Url from "url";
import * as Database from "./database";

namespace Server {

  let studis: Interfaces.Studis = {};

  const port: number = process.env.PORT || 8100;
  const server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
  });

  server.addListener("request", filterRequest);
  server.listen(port);

  function filterRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

    let query: Interfaces.UrlObject = Url.parse(_request.url, true).query;

    if (query["action"]) {

      let action: string = query["action"];

      switch (action) {

        // Insert Studi
        case "insert":
          let studi: Interfaces.Studi = <Interfaces.Studi>JSON.parse(query["json"].toString());
          Database.insert(studi);
          _response.write("Student added!");
          break;

        // Refresh Studis
        case "refresh":
          _response.write(Database.refresh());
          break;

        // Search Studi
        case "search":
          let matrikel: string = JSON.parse(query["matrikel"].toString());
          _response.write(Database.search(matrikel));
          
        default:
          _response.write("Unknown command: " + action);
          break;
      }

      // End Response
      _response.end();
    }
  }
}


/*
function(json: string): void {
  respond(_response, json);
}*/