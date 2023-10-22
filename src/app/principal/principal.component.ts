import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  dataView:any[][] =[];
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
  paginas : number = 0;
  pagina : number = 0 ;
  paginaAnterior:number = 0;
  paginaPosterior : number = 0 ;
  todasPaginas: number [] =[];
  constructor (private cdr : ChangeDetectorRef){
    const longitud = this.data.length;
    let posicion = 0 ;
    if (longitud != 0){
      this.paginas = Math.ceil(longitud/5);
      for (let i = 0 ; i < this.paginas; i++){
        this.todasPaginas.push(i+1);
        let data : any [] =[]
        for (let j = 0 ; j < 5 ;j++){
          if (posicion === longitud) break;
          data.push(this.data[posicion]);
         
          posicion++;
        }
     
        this.dataView.push(data)
    
     
      }
    }    
  }
  changePagina (position : number){    
    this.pagina = position;
    if(position > 0) this.paginaAnterior = position
    else this.paginaAnterior = 0 
    if (position <= this.paginas) this.paginaPosterior=position+1;
    else this.paginaPosterior=position

  }
  primero (){
    this.pagina=0
    this.paginaAnterior = 0 
    this.paginaPosterior=0;
  }
  anterior (){
    this.pagina = this.paginaAnterior - 1;
    this.paginaAnterior--;
    this.paginaPosterior=this.pagina;

  }

  ultimo (){
    this.pagina=this.paginas-1;
    this.paginaPosterior= this.paginas-1;
    this.paginaAnterior = this.paginas-2;
   
    
  }
  posterior(){
    this.pagina = this.paginaPosterior + 1;
    if(this.pagina !== this.paginaPosterior) this.paginaPosterior++;
    this.paginaAnterior++;

  }
}
