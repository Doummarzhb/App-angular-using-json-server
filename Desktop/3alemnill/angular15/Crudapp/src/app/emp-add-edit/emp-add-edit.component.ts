import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent  implements OnInit{
  empForm: FormGroup
 education: string[]=[
'Matric',
'Diploma',
'Intermediate',
 'Graduate',
 'Post Graduate',
 ]
 constructor(private _fb:FormBuilder ,
   private _empService:EmployeeService,
   private _dialogRef:MatDialogRef<EmpAddEditComponent>,
   @Inject(MAT_DIALOG_DATA) public data:any ){
  this.empForm = this._fb.group({
    firstName:'',
    lastName:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',
  });
 }

 ngOnInit(): void {
     this.empForm.patchValue(this.data);
 }
 onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      this._empService.updateEmploee(this.data.id ,this.empForm.value).subscribe({
        next:(val:any)=>{
          alert("Employee detail  updated !");
          this._dialogRef.close(true);
        },
         error: (err:any)=>{
          console.error(err);
         },
      });
    }else {
      this._empService.addEmploee(this.empForm.value).subscribe({
        next:(val:any)=>{
          alert("Employee added Successfully");
          this._dialogRef.close(true);
        },
         error: (err:any)=>{
          console.error(err);
         },
      });
    }

  }
 }
}
