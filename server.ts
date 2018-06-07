import * as Http from "http";
import * as Url from "url";
import * as Database from "./database";

namespace Server {

  let studis: Interfaces.Studis = {};

  const port: number = process.env.PORT || 8100;
  const server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    //_response.end(); => Causing errors for some reason...
  });

  server.addListener("request", filterRequest);
  server.listen(port);

  function filterRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {

    let query: Interfaces.UrlObject = Url.parse(_request.url, true).query;

    if (query["action"]) {

      // Insert Studi
      if (query["action"] == "insert") {
        let studi: Interfaces.Studi = <Interfaces.Studi>JSON.parse(query["json"].toString());
        studis[studi.matrikel] = studi;
        _response.write("Student added!");
      }

      // Refresh Studis
      if (query["action"] == "refresh") {
        _response.write(JSON.stringify(studis));
        console.log("refresh");
      }

      // Search Studi
      if (query["action"] == "search") {

        let matrikel: string = JSON.parse(query["matrikel"].toString());

        if (studis[matrikel]) {
          _response.write(JSON.stringify(studis[matrikel]));
        }
        else {
          _response.write("Kein Student gefunden! Bitte Suchanfrage anpassen");
        }

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