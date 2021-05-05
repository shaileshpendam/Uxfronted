import { Employee } from './../appModel/employee.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
public url = "http://localhost:3000/employees"
  constructor(private http:HttpClient) {

   }
   addEmployee(emp:Employee){
     return this.http.post(this.url,emp);
   }

   getEmployeeList(){
     return this.http.get(this.url);
   }

   delete(_id){
     return this.http.delete(`${this.url}/${_id}`)
   }

   update(emp:Employee){
    return this.http.put(`${this.url}/${emp._id}`, emp);
  }

}
