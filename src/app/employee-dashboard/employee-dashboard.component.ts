import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board model';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
  formvalue!:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData!:any;
  constructor(private fb:FormBuilder, private api:ApiService){}
  ngOnInit(){
    this.FormSubmit();
    this.getAllEmployee();
    
  }

  FormSubmit(){
    this.formvalue=this.fb.group({
      firstname:[''],
      lastname:[''],
      email:[''],
      mobile:[''],
      salary:['']
    })
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstname=this.formvalue.value.firstname;
    this.employeeModelObj.lastname=this.formvalue.value.lastname;
    this.employeeModelObj.email=this.formvalue.value.email;
    this.employeeModelObj.mobile=this.formvalue.value.mobile;
    this.employeeModelObj.salary=this.formvalue.value.salary;

    this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
      console.log(res);
      let ref=document.getElementById('cancel')
      ref?.click();
      alert("Employee Added Successfully")
      this.formvalue.reset();
      this.getAllEmployee();
    },
    _error=>{
      alert("somethin went wrong")
    }
    
    )
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData=res;
    })
  }

  deleteEmployee(employee:any){
    this.api.deleteEmployee(employee.id)
    .subscribe(_res=>{
      alert("employee Deleted");
      this.getAllEmployee();
    })
  }

  onEdit(employee:any){
    this.employeeModelObj.id=employee.id
    this.formvalue.controls["firstname"].setValue(employee.firstname),
    this.formvalue.controls["lastname"].setValue(employee.firstname),
    this.formvalue.controls["email"].setValue(employee.email),
    this.formvalue.controls["mobile"].setValue(employee.mobile),
    this.formvalue.controls["salary"].setValue(employee.salary)
  }
  UpdateEmployeeDetails(){

    this.employeeModelObj.firstname=this.formvalue.value.firstname;
    this.employeeModelObj.lastname=this.formvalue.value.lastname;
    this.employeeModelObj.email=this.formvalue.value.email;
    this.employeeModelObj.mobile=this.formvalue.value.mobile;
    this.employeeModelObj.salary=this.formvalue.value.salary;
    
    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(_res=>{
      alert("updated successfuly");
      let ref=document.getElementById('cancel')
      ref?.click();
      alert("Employee Added Successfully")
      this.formvalue.reset();
      this.getAllEmployee();
    })
  }

}
