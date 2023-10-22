import { Component } from '@angular/core';

@Component({
  selector: 'app-olvide',
  templateUrl: './olvide.component.html',
  styleUrls: ['./olvide.component.scss']
})
export class OlvideComponent {
  ver: boolean =false;
  tipo : string = "password";
  ver1: boolean =false;
  tipo1 : string = "password";
  verPassword() {
    this.ver = !this.ver;
    if (!this.ver) this.tipo="password" 
    else this.tipo = "text" 
  }
  verPassword1() {
    this.ver1 = !this.ver1;
    if (!this.ver1) this.tipo1="password" 
    else this.tipo1 = "text" 
  }
}
