import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TablaComponent } from '../tabla/tabla.component';
import { OperacionesService } from '../services/operaciones.service';
import { EditorService } from '../services/editor.service';


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


  constructor(private cdr: ChangeDetectorRef, private operaciones: OperacionesService, private editor: EditorService) {

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
    this.editor.$modal.subscribe(async (valor) => {
      let save = await this.operaciones.lsKey();
      save = save.data
      this.tableComponent.updateDatos(save);
      this.anadir = valor;
      this.cdr.detectChanges();
    });

  }
  btnAnadir() {
    this.anadir = true;

    this.editor.$id = "";
    this.cdr.detectChanges();
  }
  exportar() {
    const jsonData = JSON.stringify(this.data);
    const a = document.createElement('a');
    const file = new Blob([jsonData], { type: 'application/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'datos.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  async importar( event:any){
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json'; 
      input.addEventListener('change', (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = async (event: any) => {
          const jsonData = JSON.parse(event.target.result);
          jsonData.forEach( async (datos:any) => {
            datos.usuario = datos.usuario_correo
            datos.datosExtra = datos.otros_datos
            let resultado:any  = await this.operaciones.registrarKey(datos);
          })
          this.tableComponent.updateDatos(jsonData);
          this.cdr.detectChanges()
        };
    
        reader.readAsText(file);
      });
      input.click();
  }
}
