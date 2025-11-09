import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-employee',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent implements OnInit {
  isAdmin: any;
  employeeForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService, 
    private employeeService: EmployeeService
  ){}

  ngOnInit(): void {
    const roles = this.authService.getRolesFromToken();
    
    this.isAdmin = roles.includes('ROLE_ADMIN');

    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      designation: ['', Validators.required],
      department: ['', Validators.required],
      joiningDate: [null, Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.employeeForm.invalid) return;

    const newEmployee: Employee = this.employeeForm.value;

    this.employeeService.createNewEmployee(newEmployee, this.isAdmin).subscribe({
      next: () => {
        alert('Employee added successfully!');
        this.employeeForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error creating employee');
      }
    });
  }
}
