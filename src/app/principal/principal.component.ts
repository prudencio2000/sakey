import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TablaComponent } from '../tabla/tabla.component';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit{
  buscador: FormGroup = new FormGroup({
    text: new FormControl('')
  });
  anadir : boolean = false;
  @ViewChild(TablaComponent) tableComponent : TablaComponent | any;
  data = [
    {
      usuario: 'usuario1@ejemplo.com',
      password: 'contraseña1',
      ubicacion: 'Ubicación 1',
      otrosDatos: 'Otros datos 1',
    },
    {
      usuario: 'usuario2@ejemplo.com',
      password: 'contraseña2',
      ubicacion: 'Ubicación 2',
      otrosDatos: 'Otros datos 2',
    },
    {
      usuario: 'usuario3@ejemplo.com',
      password: 'contraseña3',
      ubicacion: 'Ubicación 3',
      otrosDatos: 'Otros datos 3',
    },
    {
      usuario: 'usuario4@ejemplo.com',
      password: 'contraseña4',
      ubicacion: 'Ubicación 4',
      otrosDatos: 'Otros datos 4',
    },
    {
      usuario: 'usuario5@ejemplo.com',
      password: 'contraseña5',
      ubicacion: 'Ubicación 5',
      otrosDatos: 'Otros datos 5',
    },
    {
      usuario: 'usuario6@ejemplo.com',
      password: 'contraseña6',
      ubicacion: 'Ubicación 6',
      otrosDatos: 'Otros datos 6',
    },
    {
      usuario: 'usuario7@ejemplo.com',
      password: 'contraseña7',
      ubicacion: 'Ubicación 7',
      otrosDatos: 'Otros datos 7',
    },
    {
      usuario: 'usuario8@ejemplo.com',
      password: 'contraseña8',
      ubicacion: 'Ubicación 8',
      otrosDatos: 'Otros datos 8',
    },
    {
      usuario: 'usuario9@ejemplo.com',
      password: 'contraseña9',
      ubicacion: 'Ubicación 9',
      otrosDatos: 'Otros datos 9',
    },
    {
      usuario: 'usuario10@ejemplo.com',
      password: 'contraseña10',
      ubicacion: 'Ubicación 10',
      otrosDatos: 'Otros datos 10',
    },
    {
      usuario: 'usuario11@ejemplo.com',
      password: 'contraseña11',
      ubicacion: 'Ubicación 11',
      otrosDatos: 'Otros datos 11',
    },
  ];
  data_aux:any []= [];
  
  constructor(private cdr : ChangeDetectorRef, private editor:EditorService) {
    this.buscador.valueChanges.subscribe((data) => {
      const text = data.text;
      this.data_aux = this.data.filter((data) => {
        return data.usuario.toLowerCase().includes(text);
      });
      this.tableComponent.updateDatos(this.data_aux);
      this.cdr.detectChanges()
    })
  }
  ngOnInit(): void {
    this.editor.$modal.subscribe((valor) => {
      this.anadir = valor;
      this.cdr.detectChanges();
    })
  }
  btnAnadir(){
    this.anadir=true;
    this.cdr.detectChanges();
  }


}
