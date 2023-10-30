import { Component, Input, OnInit } from '@angular/core';
import { SelectorService } from 'src/app/services/selector.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit{
  @Input('datos') datos : any; 
  options:boolean=false;
  selecionado:string = 'Seleccione un Opcion';
  items: any [] = [];
  constructor(private selector: SelectorService){
  
  }
  ngOnInit(): void {
    this.items=this.datos;
  }
  expandir(){
    this.options=true;
  }
  selected(item:any){
    this.selecionado= item.label;
    this.selector.$modal.emit(item)
    this.options=false;
   
  }
}
