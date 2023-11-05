import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class SwallService {

  constructor() { }
  
  mensajeOK (titulo: string, mensaje : string) {
    Swal.fire({
      title: titulo,
      text:mensaje,
      showConfirmButton: false,
      timer:3000,
      icon:'success'
    })
  }
  mensajeKO (titulo: string, mensaje : string) {
    Swal.fire({
      title: titulo,
      text:mensaje,
      showConfirmButton: false,
      timer:3000,
      icon:'error'
    })
  }

}
