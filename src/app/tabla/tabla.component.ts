import {  Component, HostListener, Input, OnInit } from '@angular/core';
import { OperacionesService } from '../services/operaciones.service';
import { SwallService } from '../services/swall.service';
import { ViewService } from '../services/view.service';
import { EditorService } from '../services/editor.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  @Input('data') data: any;
  dataView: any[][] = [];
  paginas: number = 0;
  pagina: number = 0;
  paginaAnterior: number = 0;
  paginaPosterior: number = 0;
  todasPaginas: number[] = [];
  viewElement:boolean = false;
  viewEditor:boolean = false;
  longitud :number = 8;
  constructor(private operacionService: OperacionesService, private swall:SwallService,private viewService:ViewService, private editor :EditorService) {

  }
  ngOnInit(): void {
    this.viewService.$modal.subscribe(async (valor) => {
      this.viewElement = valor;
    });
    this.editor.$modal.subscribe(async (valor) => {
      this.viewEditor = valor;
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.crearTablaPaginacion();
  }
  crearTablaPaginacion() {
    this.dataView= [];
    this.todasPaginas = [];
    this.paginas = 0;
    this.pagina = 0;
    this.paginaAnterior = 0;
    this.paginaPosterior = 0;
    if (window.innerHeight < 501) {
      this.longitud = 2
    }else if (window.innerHeight < 701){
      this.longitud = 4
    } else if (window.innerHeight < 1201){
      this.longitud = 5
    } 

    if(window.innerHeight < 531 && window.innerWidth < 451){
      this.longitud = 4
    }else if(window.innerHeight < 561 && window.innerWidth < 451){
      this.longitud = 5
    }else if(window.innerHeight < 701 && window.innerWidth < 451){
      this.longitud = 6
    }else if(window.innerHeight < 731 && window.innerWidth < 451){
      this.longitud = 7
    }else if(window.innerHeight < 761 && window.innerWidth < 451){
      this.longitud = 8
    }else if(window.innerHeight < 801 && window.innerWidth < 451){
      this.longitud = 9
    }else if(window.innerHeight < 831 && window.innerWidth < 451){
      this.longitud = 10
    }else if(window.innerHeight > 831 && window.innerWidth < 451){
      this.longitud = 10
    }
    const longitud = this.data.length;
    let posicion = 0;
    if (longitud != 0) {
      this.paginas = Math.ceil(longitud / this.longitud);
      for (let i = 0; i < this.paginas; i++) {
        this.todasPaginas.push(i + 1);
        let data: any[] = []
        for (let j = 0; j < this.longitud; j++) {
          if (posicion === longitud) break;
          data.push(this.data[posicion]);

          posicion++;
        }
        this.dataView.push(data)
      }
    }
  }
  changePagina(position: number) {
    this.pagina = position;
    if (position > 0) this.paginaAnterior = position
    else this.paginaAnterior = 0
    if (position <= this.paginas) this.paginaPosterior = position ;
    else this.paginaPosterior = position

  }
  primero() {
    this.pagina = 0
    this.paginaAnterior = 0
    this.paginaPosterior = 0;
  }
  anterior() {
    this.pagina = this.paginaAnterior - 1;
    this.paginaAnterior--;
    this.paginaPosterior = this.pagina;

  }

  ultimo() {
    this.pagina = this.paginas - 1;
    this.paginaPosterior = this.paginas - 1;
    this.paginaAnterior = this.paginas - 2;


  }
  posterior() {
    this.pagina = this.paginaPosterior + 1;
    if (this.pagina !== this.paginaPosterior) this.paginaPosterior++;
    this.paginaAnterior++;

  }
  updateDatos (data:string){
    this.dataView =[];
    this.paginas = 0;
    this.paginaAnterior = 0;
    this.paginaPosterior = 0;
    this.todasPaginas = [];
    this.data=data;
    this.crearTablaPaginacion();
  }
  async delete (id:string){
    this.swall.confirmar('Borrar Claves !!!','¿Desea borrar los datos?').then(
      async (resultado)=>{
        if (resultado.isConfirmed) {
          await this.operacionService.deleteKey(id)
          this.swall.mensajeOK("Borrado Realizado !!!","La claves se ha borrado")
          let lsKey:any = await this.operacionService.lsKey();
          lsKey = lsKey.data
          this.updateDatos(lsKey);
        } else {
          this.swall.mensajeOK('Cancelar Borrado !!!','Has cancelado el borrado')
        }
      }
    )
    
  }
  async update (dat:any) {
    let id = dat.id;
    this.viewEditor= true;
    this.editor.$id = id;
  }
  async view (dat:any) {
    this.viewElement=true,
    this.viewService.$id = dat.id;
  }
}
