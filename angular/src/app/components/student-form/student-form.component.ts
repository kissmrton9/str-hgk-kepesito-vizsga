import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { StudentHttpService } from 'src/app/service/student-http.service';
import { Student } from 'src/app/models/student';
import { switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  reactForm: FormGroup;


  student: Student = {
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    classroom: {name: ''}
  }

  student$: Observable<Student> = this.activatedRoute.params.pipe(
    switchMap(params => this.service.getById(params.id))
  );
  
  id:string = '';

  constructor(
    private service: StudentHttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.student$.pipe(take(1)).subscribe({
      next: student => {
        this.student = student;
        this.id = student['_id'];
        delete this.student['_id'];
        console.log(student);},
    });
  }

  saveStudent(){
    this.service.update(this.student,this.id).pipe(take(1)).subscribe({
      next: (student) => this.router.navigate(['/','student']),
      error: (e:any) => console.log(e.message),
    });
  }

}
