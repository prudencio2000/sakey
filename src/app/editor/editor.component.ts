import { Component } from '@angular/core';
import { EditorService } from '../services/editor.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  tipo: string = "password";
  ver:boolean = false;
  formulario : FormGroup = new FormGroup({
    usuario: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
    ubicacion: new FormControl ('',[Validators.required]),
    datosExtra: new FormControl('')
  });
  constructor(private editor:EditorService){

  }
  verPassword() {
    this.ver = !this.ver;
    if (!this.ver) this.tipo="password" 
    else this.tipo = "text" 
  }
  close(){
    this.editor.$modal.emit(false)
  }
  guardar(){
    alert(JSON.stringify(this.formulario.value))
  }
}
