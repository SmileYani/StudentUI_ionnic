import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  apiUrl = 'http://localhost:62499/api/students/';
  header = { 'content-type':'application/json'};

  constructor(public http: HttpClient) { }

  getStudents(){
    return this.http.get(this.apiUrl);
  }

  getOneStudents(id){
    return this.http.get(this.apiUrl+id);
  }

  createStudents(model){
    return this.http.post(this.apiUrl,JSON.stringify(model), {headers: this.header});
  }

  updateStudents(id,model){
    return this.http.put(this.apiUrl+id,JSON.stringify(model), {headers: this.header});
  }


  deleteStudent(id){
    return this.http.delete(this.apiUrl+id);
  }

}
