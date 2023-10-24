import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

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
  constructor(private cdr : ChangeDetectorRef) {

  }
  ngOnInit(): void {

    this.crearTablaPaginacion();
  }
 
  crearTablaPaginacion() {
    const longitud = this.data.length;
    let posicion = 0;
    if (longitud != 0) {
      this.paginas = Math.ceil(longitud / 5);
      for (let i = 0; i < this.paginas; i++) {
        this.todasPaginas.push(i + 1);
        let data: any[] = []
        for (let j = 0; j < 5; j++) {
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

}
