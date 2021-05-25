import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  form: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', {
        validators: [
          Validators.required,
          this.minMaxValidator
        ]
      }],
      email: ['', {
        validators: [
          Validators.required,
          Validators.email
        ]
      }],
      passwordZone: this.formBuilder.group({
        password: [''],
        repeatedPassword: ['']
      }, {
        validators: [this.checkPasswords],
        updateOn: 'change'
      }),
      name: ['', {
        validators: [
          Validators.required,
          Validators.pattern(/^[\w-\s]+$/)
        ]
      }]
    }, {
      updateOn: 'submit'
    });
  }
  minMaxValidator(control: FormControl){
    const actualLength = control.value.trim().length;
    const minLength = 6;
    const maxLength = 20;
    console.log('I am Here I')
    if(actualLength > maxLength || actualLength < minLength){
      return {
        minMaxError: true,
        minLength,
        maxLength,
        actualLength
      }
    }
    return null;
  }
  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const repeatedPassword = group?.get('repeatedPassword')?.value;
    if(password != repeatedPassword){
      //console.log(this.form.controls['passwordZone']);
      return { passwordsNotMatche: true }
    }
    return null;
  }
  handleSubmit(form: any){
    console.log(this.form.value.passwordZone);
  }

}
