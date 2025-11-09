import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-employees',
  imports: [NgFor],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  constructor(
    private employeeService: EmployeeService
  ){}

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList(): void {
    this.employeeService.getEmployeeList().subscribe({
      next: (data) => {
        if (data.success) {
          console.log(data.data);
          
          this.employees = data.data;
        }
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
