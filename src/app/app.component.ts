import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employeeDetails: any;
  createEmployeeFrom: FormGroup;
  updateEmployeeFrom: FormGroup;
  id: any;
  title = 'crud-node';
  constructor(
    private service: ApiService,
    public formBuilder: FormBuilder,
    public modalService: NgbModal,
    private httpClient: HttpClient
  ) {
    this.createEmployeeFrom = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.updateEmployeeFrom = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.employeeList();    
  }

  employeeList() {
    this.service.getEmployees().subscribe((res: any) => {
      this.employeeDetails = res.data;
    });
  }

  openEmployeeModal(content: any) {
    this.modalService.open(content, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
  }

  openUpdateEmployeeModal(content: any,employee: any){
    this.modalService.open(content, {
      size: 'md',
      backdrop: 'static',
      centered: true,
    });
    this.id = employee.id;
    let name = employee.name;
    let email = employee.email;
    this.updateEmployeeFrom = this.formBuilder.group({
      name: [`${name}`, [Validators.required]],
      email: [`${email}`, [Validators.required]],
    });
  }

  closeModal() {
    this.modalService.dismissAll();
    this.createEmployeeFrom.reset();
  }

  createEmployee() {
    if (this.createEmployeeFrom.invalid) {
      return
    }
    else {
      let employeeDetails = this.createEmployeeFrom.value;
      this.service.postEmployee(employeeDetails);
      this.employeeList();
    }
    this.closeModal();
  }

  updateEmployee(id:any){
    if (this.updateEmployeeFrom.invalid) {
      return
    }
    else {
      let employeeDetails = this.updateEmployeeFrom.value;
      this.service.updateEmployee(id,employeeDetails);
      this.employeeList();
    }
    this.closeModal()
  }

  deleteEmployee(id:any){
    this.service.deleteEmployee(id);
    this.employeeList()
  }

}
