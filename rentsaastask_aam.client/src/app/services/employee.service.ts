import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
}

export interface PagedResult<T> {
  data: T[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/api/employees';

  constructor(private http: HttpClient) { }

  getEmployees(page: number = 1, pageSize: number = 10, search: string = ''): Observable<PagedResult<Employee>> {
    let url = `${this.apiUrl}?page=${page}&pageSize=${pageSize}`;
    if (search && search.trim().length > 0) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    return this.http.get<PagedResult<Employee>>(url);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
