import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  createNewEmployee(employee: Employee, isAdmin: false): Observable<Employee> {
    let uri = this.apiUrl;
    if (isAdmin) {
      uri = `${uri}/admin/employees/hr`;
    }
    else {
      uri = `${uri}/hr/employees`;
    }
    console.log('employee', employee);
    

    return this.http.post<Employee>(uri, employee);
  }

  getEmployeeList(): Observable<ApiResponse<Employee[]>> {
    return this.http.get<ApiResponse<Employee[]>>(`${this.apiUrl}/hr/employees`);
  }
}
