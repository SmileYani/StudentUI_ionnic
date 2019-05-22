import { Student } from './../models/student';
import { StudentService } from './../services/student.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-data-student',
  templateUrl: './add-data-student.page.html',
  styleUrls: ['./add-data-student.page.scss'],
})
export class AddDataStudentPage implements OnInit {

  public studentForm: FormGroup;
  title='เพิ่มข้อมูลนักศึกษา';
  id: any;

  constructor(private route: Router,
    private stuSV: StudentService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.formStudent();
    this.activateRoute.params.forEach(
      params => {
        if (params.id !== undefined) {
          this.title = 'แก้ไขข้อมูลนักศึกษา';
          this.id = params.id;
          this.formEditStudent(params.id)
        }
      });
  }

  formStudent() {
    this.studentForm = this.formBuilder.group({
      stu_id: [null, Validators.required],
      stu_title: ['1'],
      stu_name: [null, Validators.required],
      stu_surname: [null, Validators.required],
      stu_phone: [null, Validators.required]
    });
  }

  onSubmit(){
    if (this.studentForm.get('stu_id').value==this.id) {
      console.log(this.id,this.studentForm.value);
      this.studentForm.get('stu_id').enable();
      this.stuSV.updateStudents(this.id,this.studentForm.value).subscribe();
    }
    else{
      this.stuSV.createStudents(this.studentForm.value).subscribe();
    }
    this.route.navigateByUrl('tabs');
  }

  formEditStudent(id){
    this.stuSV.getOneStudents(id).subscribe(
      (data: Student) => {
        this.studentForm.get('stu_id').setValue(data.stu_id);
        this.studentForm.get('stu_id').disable();
        this.studentForm.get('stu_id').setValue(data.stu_id);
        this.studentForm.get('stu_title').setValue(data.stu_title);
        this.studentForm.get('stu_name').setValue(data.stu_name);
        this.studentForm.get('stu_surname').setValue(data.stu_surname);
        this.studentForm.get('stu_phone').setValue(data.stu_phone);
      }
    );
  }
}
