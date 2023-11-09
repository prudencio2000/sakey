import { Component, OnInit } from '@angular/core';
import { OperacionesService } from '../services/operaciones.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  formulario: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repetPassword: new FormControl('', [Validators.required]),
  })
  constructor(private operaciones: OperacionesService) {

  }
  async ngOnInit() {
    let datos: any = await this.operaciones.questionValidacion();
    datos = datos.data;
    this.titulos = datos.map((dato: any) => dato.titulo);
    let contador = 1;
    datos.forEach((data: any) => {
      this.formulario.addControl(`question_${contador}`, new FormControl('', [Validators.required]))
      contador++;
    });
    console.log(this.formulario);
    
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
  cambiarPassword(){
    console.log(this.formulario.valid);
    
  }
}
