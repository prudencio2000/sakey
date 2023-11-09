import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OperacionesService } from '../services/operaciones.service';
import { SwallService } from '../services/swall.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ver: boolean = false;
  tipo: string = "password";
  formulario: FormGroup = new FormGroup({
    password: new FormControl('')
  })

  constructor(private router: Router, private operaciones: OperacionesService, private swall: SwallService) {
    
  }
  async ngOnInit() {
    let datos = await this.operaciones.questionValidacion();

  }

  verPassword() {
    this.ver = !this.ver;
    if (!this.ver) this.tipo = "password"
    else this.tipo = "text"
  }
  async ngSubmit() {
    const password = this.formulario.value.password;
    const respuesta = await this.operaciones.entrar(password)
    if (respuesta.status) {
      this.router.navigate(['/principal'])
    } else {
      this.swall.mensajeKO('Error!', 'La contraseña es incorrepta');
    }

  }
}
