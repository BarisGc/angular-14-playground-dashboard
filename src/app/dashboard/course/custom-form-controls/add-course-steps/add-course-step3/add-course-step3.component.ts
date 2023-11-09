import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/**
 *FormGroup is used to keep track of the value and validity state of a group of FormControl instances.
 *
 *FormControl is used to keep track of the value and validation status of an individual form control.
 *
 *FormControlName is a directive that links a FormControl in a FormGroup to a form control by name.
 *
 *FormGroupDirective is a directive that binds a FormGroup to a DOM element.
 *
 *FormGroupName is a directive that links a nested FormGroup to a DOM element.
 *
 *FormArrayName is a directive that links a nested FormArray to a DOM element.
 */
@Component({
  selector: 'app-add-course-step3',
  templateUrl: './add-course-step3.component.html',
  styleUrls: ['./add-course-step3.component.scss'],
})
export class AddCourseStep3Component implements OnInit {
  form = this.formBuilder.group({
    lessons: this.formBuilder.array([
      this.formBuilder.group({
        title: ['Angular', Validators.required],
        level: ['intermediate', Validators.required],
      }),
    ]),
  });

  /* example of nested form array:
  https://www.tektutorialshub.com/angular/nested-formarray-example-add-form-fields-dynamically/

  this.empForm=this.fb.group({
  employees: this.fb.array([]) ,
  })

  employees(): FormArray {
  return this.empForm.get("employees") as FormArray
  }

  newEmployee(): FormGroup {
    return this.fb.group({
      firstName: '',
      lastName: '',
      skills:this.fb.array([])
    })
  }

  addEmployee() {
    this.employees().push(this.newEmployee());
  }
  removeEmployee(empIndex:number) {
  this.employees().removeAt(empIndex);
  }

  employeeSkills(empIndex:number) : FormArray {
  return this.employees().at(empIndex).get("skills") as FormArray
  }

  newSkill(): FormGroup {
  return this.fb.group({
    skill: '',
    exp: '',
  })
  }

  addEmployeeSkill(empIndex:number) {
  this.employeeSkills(empIndex).push(this.newSkill());
  }

  removeEmployeeSkill(empIndex:number,skillIndex:number) {
  this.employeeSkills(empIndex).removeAt(skillIndex);
  }
    */

  // getters
  get _lessons() {
    return this.form.get('lessons') as FormArray;
  }

  get _lessonFormArrayControls() {
    return (this.form.controls['lessons'] as FormArray).controls as FormGroup[];
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    // alternative
    // ngOnInit() {
    //   this.searchForm = this.fb.group({
    //     name: '',
    //     desc: '',
    //     properties: this.fb.array([this.createItem()])
    //   });
    // }
    // createItem(): FormGroup {
    //   return this.fb.group({
    //     social_media: '',
    //     github:''
    //   });
    // }
  }

  addLesson() {
    const lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      level: ['beginner', Validators.required],
    });

    this._lessons.push(lessonForm);
  }
  deleteLesson(lessonIndex: number) {
    this._lessons.removeAt(lessonIndex);
  }
}
