import { Component } from '@angular/core';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  tipo: string = "password";
  ver:boolean = false;
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
}
