import { Employee } from './../appModel/employee.model';
import { EmployeeService } from './../appService/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  public name: string;
  public employee: Employee[];
  constructor(private fb: FormBuilder, private _employee: EmployeeService) {

  }
  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Ex . Alex jonshon', Validators.required],
      position: ['', Validators.required],
      dept: ['']
    })
  }
  onAddEmployee() {
    this.showModal = true;
  }
  onCloseModal() {
    this.showModal = false;
  }

  getEmployees() {
    this._employee.getEmployeeList().subscribe((res: Employee[]) => {
      this.employee = res;
      this.getEmployees();
    }, (err) => {
      console.log(err)

    })
  }

  onSubmit(): void {
    if (this.empForm.valid) {
      if (this.editMode) {
        this._employee.update(this.empForm.value).subscribe((res) => {
          console.log(res)
        },
          (err) => {
            console.log(err)
          })

      } else {

        this._employee.addEmployee(this.empForm.value).subscribe((res) => {
          console.log(res)
        },
          (err) => {
            console.log(err)
          })

      }
      // Process checkout data here
      // this.items = this.cartService.clearCart();
      // console.warn('Your order has been submitted', this.checkoutForm.value);
      this.empForm.reset();
      this.showModal = false;
    }

  }

  edit(emp) {
    this.showModal = true;
    this.editMode = true;
    this.empForm.patchValue(emp);
  }

  onDelete(id) {
    if (confirm('DO you want to delete this employee ..?')) {
      this._employee.delete(id).subscribe((res) => {
        console.log(res, 'employee deleted');
        this.getEmployees();
      },
        (err) => {
          console.log(err)
        });
    }
  }
}
