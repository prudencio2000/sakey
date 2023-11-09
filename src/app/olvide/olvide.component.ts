import { Component, OnInit } from '@angular/core';
import { OperacionesService } from '../services/operaciones.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SwallService } from '../services/swall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.component.html',
  styleUrls: ['./olvide.component.scss']
})
export class OlvideComponent implements OnInit {

  ver: boolean = false;
  tipo: string = "password";
  ver1: boolean = false;
  tipo1: string = "password";
  titulos: string[] = [];
  respuesta: string[] = [];
  formulario: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repetPassword: new FormControl('', [Validators.required]),
  })
  constructor(private operaciones: OperacionesService, private swall: SwallService, private router: Router) {

  }
  async ngOnInit() {
    let datos: any = await this.operaciones.questionValidacion();
    datos = datos.data;
    this.titulos = datos.map((dato: any) => dato.titulo);
    this.respuesta = datos.map((dato: any) => dato.respuesta);
    console.log(this.respuesta);

    let contador = 1;
    datos.forEach((data: any) => {
      this.formulario.addControl(`question_${contador}`, new FormControl('', [Validators.required]))
      contador++;
    });

  }
  verPassword() {
    this.ver = !this.ver;
    if (!this.ver) this.tipo = "password"
    else this.tipo = "text"
  }
  verPassword1() {
    this.ver1 = !this.ver1;
    if (!this.ver1) this.tipo1 = "password"
    else this.tipo1 = "text"
  }
  async cambiarPassword() {
    const valid = this.formulario.valid;
    const valor = this.formulario.value;
    let validQuestion = false;
    console.log(valor);

    const passwordValid = this.formulario.get('password')?.valid;
    if (!passwordValid) {
      this.swall.mensajeKO('Error !!!', "La contraseña es incorrecta. Tiene que poner una letra minuscula, mayuscula, número y cáracter especial. La logitud tiene que ser  8 a 16")
    } else if (!valid) {
      this.swall.mensajeKO('Error !!!', "Ningún campo debe estar vacio")
    } else {
      for (let clave in valor) {
        let id: any = clave.split('_')[1]
        if (this.respuesta[id] === clave[valor]) {
          validQuestion = true
        } else {
          validQuestion = false
        }
      }
      if (!validQuestion) {
        this.swall.mensajeKO('Error !!!', "Las repuestas no coinciden")
      } else {
        if (valor.password == valor.repetPassword) {
          const respuesta: any = await this.operaciones.updatePassword(valor);
          if (respuesta.status) {
            this.swall.mensajeOK("Exito !!!", "Se ha actualizado la contraseña");
            this.router.navigateByUrl('/');
          }
        } else {
          this.swall.mensajeKO('Error !!!', "Las contraseña no coinciden")
        }
      }
    }
  }

}
