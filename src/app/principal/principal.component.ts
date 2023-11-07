import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TablaComponent } from '../tabla/tabla.component';
import { OperacionesService } from '../services/operaciones.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {
  buscador: FormGroup = new FormGroup({
    text: new FormControl('')
  });
  anadir: boolean = false;
  @ViewChild(TablaComponent) tableComponent: TablaComponent | any;
  data: any[] = [];
  data_aux: any[] = [];


  constructor(private cdr: ChangeDetectorRef, private operaciones: OperacionesService) {

  }
  async ngOnInit() {
    let dat: any = await this.operaciones.lsKey();
    
    
    this.data = dat.data;
    this.data_aux = this.data;
    this.tableComponent.updateDatos(this.data_aux);
    this.buscador.valueChanges.subscribe((data) => {
      const text = data.text;
      this.data_aux = this.data.filter((item) => {
        return item.usuario_correo.toLowerCase().includes(text);
      });
      this.tableComponent.updateDatos(this.data_aux);
      this.cdr.detectChanges();
    });
  }
  btnAnadir() {
    this.anadir = true;
    this.cdr.detectChanges();
  }


}
