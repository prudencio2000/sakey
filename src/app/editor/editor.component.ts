import { Component, OnInit, ViewChild } from '@angular/core';
import { EditorService } from '../services/editor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OperacionesService } from '../services/operaciones.service';
import { SwallService } from '../services/swall.service';
import { TablaComponent } from '../tabla/tabla.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  tipo: string = "password";
  ver: boolean = false;
  isCerrar: boolean = false
  formulario: FormGroup = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    ubicacion: new FormControl('', [Validators.required]),
    datosExtra: new FormControl('')
  });
  update: boolean = false;
  datos: any;

  @ViewChild(TablaComponent) tableComponent: TablaComponent | any;
  constructor(private editor: EditorService, private operaciones: OperacionesService, private swall: SwallService) {

  }
  async ngOnInit() {
    this.isCerrar = false;
    let id = this.editor.$id;
    if (id) {
      this.update = true
      const resultado: any = await this.operaciones.lsOneKey(id);
      this.datos = resultado.data;
      console.log(this.datos);
      this.formulario.setValue({
        usuario: this.datos.usuario_correo,
        password: this.datos.passwordView,
        ubicacion: this.datos.ubicacion,
        datosExtra: this.datos.otros_datos
      });

    }
  }

  verPassword() {
    this.ver = !this.ver;
    if (!this.ver) this.tipo = "password"
    else this.tipo = "text"
  }
  close() {
    this.isCerrar = true;
    setTimeout(() => {
      this.editor.$modal.emit(false)
    }, 1000)
  }
  async guardar() {
    let valid = this.formulario.valid;
    let datos = this.formulario.value
    if (valid) {
      let resultado: any = {};
      if (!this.update) {
        resultado = await this.operaciones.registrarKey(datos);
      } else {
        datos.id = this.editor.$id;
        resultado = await this.operaciones.updateSave(datos);
      }
      console.log(resultado);


      if (resultado.status) {
        this.swall.mensajeOK('Sakey!!!', 'Contraseña guardada correctamente');
        this.isCerrar = true;
        setTimeout(() => {
          this.editor.$modal.emit(false)
        }, 1000)
      } else {
        this.swall.mensajeOK('Sakey!!!', 'La contraseña no se ha guardado correctamente');
        this.isCerrar = true;
        setTimeout(() => {
          this.editor.$modal.emit(false)
        }, 1000)
      }
    } else {
      this.swall.mensajeKO('Error!!!', 'El usuario, contraseña y ubicación son obligatorias');
    }

  }
}
