import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Employee, EmployeeService, PagedResult } from '../../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.css'],
    standalone: false
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'position', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);
  isLoading = true;
  filterValue = '';
  total = 0;
  page = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.page = 1;
    this.pageSize = 5;
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    // Ensure paginator is properly initialized
    if (this.paginator) {
      this.paginator.pageIndex = this.page - 1; // Convert 1-based to 0-based
      this.paginator.pageSize = this.pageSize;
    }
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getEmployees(this.page, this.pageSize, this.filterValue).subscribe({
      next: (result: PagedResult<Employee>) => {
        this.dataSource.data = result.data;
        this.total = result.total;
        this.isLoading = false;
        
        // Update paginator state after data loads
        if (this.paginator) {
          this.paginator.pageIndex = this.page - 1; // Convert 1-based to 0-based
          this.paginator.pageSize = this.pageSize;
        }
      },
      error: () => {
        this.snackBar.open('Failed to load employees', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1; // Convert 0-based to 1-based
    this.pageSize = event.pageSize;
    this.loadEmployees();
  }

  onSearchChange(event: Event): void {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.loadEmployees();
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(employee: Employee): void {
    this.router.navigate(['/employees/edit', employee.id]);
  }

  deleteEmployee(employee: Employee): void {
    if (confirm(`Delete employee ${employee.firstName} ${employee.lastName}?`)) {
      this.employeeService.deleteEmployee(employee.id!).subscribe({
        next: () => {
          this.snackBar.open('Employee deleted', 'Close', { duration: 2000 });
          this.loadEmployees();
        },
        error: () => {
          this.snackBar.open('Failed to delete employee', 'Close', { duration: 3000 });
        }
      });
    }
  }
}
