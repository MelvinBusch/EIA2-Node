namespace Interfaces {
  
  export interface Studi {
    name: string;
    firstname: string;
    matrikel: number;
    age: number;
    gender: boolean;
    course: string;
  }

  export interface Studis {
    [matrikel: string]: Studi;
  }
  
  export interface UrlObject {
    [key: string]: string
  }

}