import { Component, OnInit } from '@angular/core';
import { ViewService } from '../services/view.service';
import { OperacionesService } from '../services/operaciones.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  isCerrar: boolean = false;
  key: any;
  ver:boolean = false ;
  password = "";
  constructor(private view: ViewService, private operacion: OperacionesService) {

  }
  async ngOnInit() {
    const resultado: any = await this.operacion.lsOneKey(this.view.$id);
    this.key = resultado.data;
    this.password= this.key.password
  }
  close() {
    this.isCerrar = true;
    setTimeout(() => {
      this.view.$modal.emit(false)
    }, 1000)
  }
  verPassword(){
    if (this.ver){
      this.password = this.key.password;
      this.ver = false
    }else{
      this.password = this.key.passwordView;
      this.ver = true
    }

  }
}
