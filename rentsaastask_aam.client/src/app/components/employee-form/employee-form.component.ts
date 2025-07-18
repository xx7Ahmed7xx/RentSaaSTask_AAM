import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../../services/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css'],
    standalone: false
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeId?: number;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.employeeId = +id;
        this.loadEmployee(this.employeeId);
      }
    });
  }

  loadEmployee(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue(employee);
        this.isLoading = false;
      },
      error: () => {
        this.snackBar.open('Failed to load employee', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) return;
    this.isLoading = true;
    let employee: Employee = this.employeeForm.value;
    if (this.isEditMode && this.employeeId) {
      employee = { id: this.employeeId, ...this.employeeForm.value };
      this.employeeService.updateEmployee(this.employeeId, employee).subscribe({
        next: () => {
          this.snackBar.open('Employee updated', 'Close', { duration: 2000 });
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.snackBar.open('Failed to update employee', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    } else {
      this.employeeService.addEmployee(employee).subscribe({
        next: () => {
          this.snackBar.open('Employee added', 'Close', { duration: 2000 });
          this.router.navigate(['/employees']);
        },
        error: () => {
          this.snackBar.open('Failed to add employee', 'Close', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/employees']);
  }
}
