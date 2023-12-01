import { Component, Input, OnInit } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit{
  options:boolean=false;
  selecionado:string = 'Seleccione un Opcion';
  items: any [] = [];
  constructor(private selector: SelectorService){
  
  }
  ngOnInit(): void {
    
  }
  actualizarDatos(datos : any){
    this.items=datos;
  }
  expandir(){
    this.options=true;
  }
  selected(item:any){
    this.selecionado= item.titulo;
    this.items = this.items.filter(data => data.id !== item.id);
    this.options=false;
    this.selector.$modal.emit(item)
   
  }
}
