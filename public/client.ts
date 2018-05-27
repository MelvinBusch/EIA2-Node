namespace Client {

  const adress: string = "https://eia-melvin.herokuapp.com/";

  let inputs: NodeListOf<HTMLInputElement>;
  let searchResult: HTMLElement;
  let refreshArea: HTMLTextAreaElement;

  function init(_event: Event): void {

    inputs = document.getElementsByTagName("input");

    let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
    let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
    let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("search");

    insertButton.addEventListener("click", insert);
    refreshButton.addEventListener("click", refresh);
    searchButton.addEventListener("click", search);

    searchResult = <HTMLElement>document.getElementById("search-result");
    refreshArea = <HTMLTextAreaElement>document.getElementsByTagName("textarea")[0];
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

    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        alert(xhr.responseText);
    };
  }

  // Refresh Studis
  function refresh(): void {
    let xhr: XMLHttpRequest = new XMLHttpRequest();
    xhr.open("GET", adress + "?action=refresh", true);
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {

        let studis = JSON.parse(xhr.responseText.toString());
        let answer: string = "";

        for (let studi in studis) {
          answer += `Matrikel: ${studi}\n`;
          answer += `Lastname: ${studis[studi].name}\n`;
          answer += `Firstname: ${studis[studi].firstname}\n`;
          answer += `Age: ${studis[studi].age}\n`;
          answer += `Gender: ${studis[studi] ? "male" : "female"}\n`;
          answer += `Course: ${studis[studi].course}\n\n`;
        }

        refreshArea.innerText = answer;
      }
    };
  }

  // Search Studi
  function search(): void {
    let searchKey: string = inputs[7].value;

    if (searchKey != "") {
      let xhr: XMLHttpRequest = new XMLHttpRequest();
      xhr.open("GET", adress + "?action=search&matrikel=" + searchKey, true);
      xhr.send();

      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {          
          searchResult.innerText = xhr.responseText;
        }
      };
    } else {
      searchResult.innerText = "Bitte Suchanfrage eingeben!";
    }
  }

  window.addEventListener("load", init);
}