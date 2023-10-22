import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    ver: boolean =false;
    tipo : string = "password";

    formulario : FormGroup = new FormGroup({
      password : new FormControl('')
    })

    constructor(){

    }

    verPassword() {
      this.ver = !this.ver;
      if (!this.ver) this.tipo="password" 
      else this.tipo = "text" 
    }
    ngSubmit (){
      const password = this.formulario.value.password;
      alert(password)
    }
}
