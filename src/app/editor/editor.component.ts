import { Component } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  tipo: string = "password";
  ver:boolean = false;
  verPassword() {
    this.ver = !this.ver;
    if (!this.ver) this.tipo="password" 
    else this.tipo = "text" 
  }
}
