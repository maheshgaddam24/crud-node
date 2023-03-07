import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getEmployees(){
    return this.httpClient.get('http://localhost:8000/employee')
  }

  postEmployee(employeeDetails: any){
    let body = employeeDetails;
    this.httpClient.post('http://localhost:8000/employee',body).subscribe()
  }

  updateEmployee(id: any,employeeDetails:any) {
    let body = employeeDetails;
    this.httpClient.put(`http://localhost:8000/employee/${id}`,body).subscribe()
  }

  deleteEmployee(id: any) {
    this.httpClient.delete(`http://localhost:8000/employee/${id}`).subscribe()
  }
}
