import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectorComponent } from '../items/selector/selector.component';
import { SelectorService } from '../services/selector.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '../class/questions.class';
import { OperacionesService } from '../services/operaciones.service';

import { Router } from '@angular/router';
import { SwallService } from '../services/swall.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  tipo: string = "password";
  isVer: boolean = false;
  formulario: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  });
  preguntasSeleccionada: any = [];
  preguntasSeguridad: Question[] = [];
  contador: number = 0;
  @ViewChild(SelectorComponent) SelectorComponent: SelectorComponent | any;
  @ViewChild(SelectorComponent) selectron: SelectorComponent | any;
  constructor(private selector: SelectorService, private router: Router, private operaciones: OperacionesService,private swall:SwallService) { }
  async ngOnInit() {
    const data = await this.operaciones.lsQuestion();
    this.preguntasSeguridad = data.data
    this.selectron.actualizarDatos(this.preguntasSeguridad)
    this.selector.$modal.subscribe({
      next: (data: any) => {
        this.preguntasSeleccionada.push(data)
        this.formulario.addControl(`question_${data.id}`, new FormControl('', Validators.required));
        this.contador++;
      }
    })
  }
  verPassword() {
    if (!this.isVer) {
      this.tipo = "text";
    } else {
      this.tipo = "password"
    }
    this.isVer = !this.isVer;
  }
  async ngSubmit() {
    const datos = this.formulario.value;
    const passwordValid = this.formulario.get('password')?.valid;
    if (datos.password !== datos.repeatPassword){
      this.swall.mensajeKO("Error con las contraseña !!!","Error las contraseña no coincides");
      return
    }else if ( !passwordValid ){
      this.swall.mensajeKO('Error !!!', "La contraseña es incorrecta. Tiene que poner una letra minuscula, mayuscula, número y cáracter especial. La logitud tiene que ser  8 a 16")
      return
    }else if (this.formulario.invalid) {
      this.swall.mensajeKO("Error con los Campos !!!","Error no tiene que estar ningun campo vacio y debes seleccionar tres preguntas");
      return
    } else if (this.contador < 3) {
      this.swall.mensajeKO("Error con los Preguntas  !!!","Tiene que seleccionar 3 preguntas");
      return
    }
    let array_datos: any = []
    for (let clave in datos) {
      if (clave.includes('question')) {
        array_datos.push({
          'idQuestion': clave.split("_")[1],
          'respuesta': datos[clave]
        })
      }
    }
    let resultado = await this.operaciones.registrarLogin(datos);
    if (resultado.status) {
      resultado = await this.operaciones.registrarQuestion(array_datos);
      if (resultado.status) {
        this.swall.mensajeOK("Operacion existosa !!!","El login se ha registrado correctamente");
        this.router.navigate(['login']);
      }
    }
  }
}
