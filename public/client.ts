namespace Client {

  let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
  let searchResult: HTMLElement;
  let adress: string = "http://localhost:8100/";

  function init(_event: Event): void {
    let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
    let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
    let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("search");

    insertButton.addEventListener("click", insert);
    refreshButton.addEventListener("click", refresh);
    searchButton.addEventListener("click", search);
    
    searchResult = <HTMLElement>document.getElementById("search-result");
  }
  
  // Insert Studi
  function insert(): void {
    let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
    let matrikel: string = inputs[2].value;
    
    let json = JSON.stringify({
      name: inputs[0].value,
      firstname: inputs[1].value,
      matrikel: parseInt(matrikel),
      age: parseInt(inputs[3].value),
      gender: genderButton.checked,
      course: inputs[6].value 
    });
    
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", adress + "?action=insert&json=" + json, true);
    xhr.send();
  }
  
  // Refresh Studis
  function refresh(): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", adress + "?action=refresh", true);
    xhr.send();
  }
  
  // Search Studi
  function search(): void {
    let searchKey: string = inputs[7].value;
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", adress + "?action=search&matrikel=" + searchKey, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        searchResult.innerText = xhr.readyState + "";
      }
    };
  }
  
  window.addEventListener("load", init);
}