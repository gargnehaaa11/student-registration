import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {StudentModel} from './student-model';
import { StudentService } from './student.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  studentData : any = [];
  studentForm!:FormGroup;
  showAdd !: boolean;
  showBtn !: boolean;
  submitted = false;
  studentModelObj : StudentModel = new StudentModel();
  constructor(private formBuilder: FormBuilder, private api : StudentService) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      sname: ['', Validators.required],
      email:['', Validators.required],
      mobile:['', Validators.required],
      dob:['', Validators.required],
      gender : ['', Validators.required],
      city : ['', Validators.required],
      state : ['', Validators.required]
    });
    this.getStudentData();
  }
  clickAddStudent(){
    this.studentForm.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
  postStudentData() {
    this.studentModelObj.sname = this.studentForm.value.sname;
    this.studentModelObj.email = this.studentForm.value.email;
    this.studentModelObj.mobile = this.studentForm.value.mobile;
    this.studentModelObj.dob = this.studentForm.value.dob;
    this.studentModelObj.gender = this.studentForm.value.gender;
    this.studentModelObj.city = this.studentForm.value.city;
    this.studentModelObj.state = this.studentForm.value.state;
    this.api.postStudent(this.studentModelObj).subscribe(res => {
      console.log(res);
     alert("Student Enroll Successfully...");
     let ref = document.getElementById('cancel');
     ref?.click();
      this.studentForm.reset();
      this.getStudentData();
    }, 
    err => {
      alert("Something Went Wrong...!")
    })
  }
  getStudentData(){
   this.api.getStudent().subscribe(res => {
     console.log(res);
     this.studentData = res;
     console.log(this.studentData);
   })
  }
  deleteStudent(row : any){
    this.api.DeleteStudent(row.id).subscribe(res => {
      console.log(res);
      alert("Student Deleted...");
      this.getStudentData();
    })
  }
  editStudent(row : any){
    this.showAdd = false;
    this.showBtn = true;
    this.studentModelObj.id = row.id;
     this.studentForm.controls['sname'].setValue(row.sname);
     this.studentForm.controls['email'].setValue(row.email);
     this.studentForm.controls['mobile'].setValue(row.mobile);
     this.studentForm.controls['dob'].setValue(row.dob);
     this.studentForm.controls['gender'].setValue(row.gender);
     this.studentForm.controls['city'].setValue(row.city);
     this.studentForm.controls['state'].setValue(row.state);
  }
  updateStudentData(){
    this.studentModelObj.sname = this.studentForm.value.sname;
    this.studentModelObj.email = this.studentForm.value.email;
    this.studentModelObj.mobile = this.studentForm.value.mobile;
    this.studentModelObj.dob = this.studentForm.value.dob;
    this.studentModelObj.gender = this.studentForm.value.gender;
    this.studentModelObj.city = this.studentForm.value.city;
    this.studentModelObj.state = this.studentForm.value.state;
    this.api.updateStudent(this.studentModelObj, this.studentModelObj.id).subscribe(res => {
      console.log(res);
     alert("Update Successfully...");
     let ref = document.getElementById('cancel');
     ref?.click();
      this.studentForm.reset();
      this.getStudentData();
    })
  }

}
