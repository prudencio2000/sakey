import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SelectorComponent } from '../items/selector/selector.component';
import { SelectorService } from '../services/selector.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit{
  tipo:string = "password";
  isVer:boolean =false;
  @ViewChild(SelectorComponent) SelectorComponent : SelectorComponent | any;
  formulario : FormGroup = new FormGroup({
    password : new FormControl('',Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  });
  preguntasSeleccionada:any = []
  preguntasSeguridad: { value: number, label: string }[] = [
    { value: 1, label: '¿Cuál es el nombre de tu mascota?' },
    { value: 2, label: '¿Cuál es el nombre de soltera de tu madre?' },
    { value: 3, label: '¿En qué ciudad naciste?' },
    { value: 4, label: '¿Cuál es tu comida favorita?' },
    { value: 5, label: '¿Cuál es tu color favorito?' },
    { value: 6, label: '¿Cuál es el nombre de tu primer automóvil?' },
    { value: 7, label: '¿Cuál es tu canción favorita?' },
    { value: 8, label: '¿Cuál es tu película favorita?' },
    { value: 9, label: '¿Cuál es el nombre de tu abuela materna?' },
    { value: 10, label: '¿Cuál es tu equipo deportivo favorito?' },
    { value: 11, label: '¿En qué año naciste?' },
    { value: 12, label: '¿Cuál es el nombre de tu mejor amigo de la infancia?' },
    { value: 13, label: '¿Cuál es el nombre de tu escuela primaria?' },
    { value: 14, label: '¿Cuál es tu ciudad favorita para visitar?' },
    { value: 15, label: '¿Cuál es tu libro favorito?' },
    { value: 16, label: '¿Cuál es el modelo de tu primer automóvil?' },
    { value: 17, label: '¿Cuál es el nombre de tu primer jefe?' },
    { value: 18, label: '¿Cuál es el nombre de tu primer amor platónico?' },
    { value: 19, label: '¿Cuál es tu número de placa de automóvil favorito?' },
    { value: 20, label: '¿Cuál es el nombre de tu abuelo paterno?' },
    { value: 21, label: '¿Cuál es tu pasatiempo favorito?' },
    { value: 22, label: '¿Cuál es el nombre de tu mascota actual?' },
    { value: 23, label: '¿Cuál es el nombre de tu personaje ficticio favorito?' },
    { value: 24, label: '¿En qué país te gustaría vivir si pudieras elegir cualquiera?' },
    { value: 25, label: '¿Cuál es tu número de suerte?' },
    { value: 26, label: '¿Cuál es tu canción de karaoke favorita?' },
    { value: 27, label: '¿Cuál es tu deporte favorito para ver?' },
    { value: 28, label: '¿Cuál es el nombre de tu profesor favorito en la escuela?' },
    { value: 29, label: '¿Cuál es tu plato de comida favorito?' },
    { value: 30, label: '¿Cuál es el nombre de tu primo hermano?' },
  ];
  constructor(private selector:SelectorService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this.selector.$modal.subscribe({
      next: (data:any) =>{
        this.preguntasSeleccionada.push(data);
        this.formulario.addControl(`question_${data.value}`,new FormControl('',Validators.required));
      }
    })
  }
  verPassword(){
    if(!this.isVer){
      this.tipo="text";
    }else{
      this.tipo="password"
    }
    this.isVer= !this.isVer;
  }
  ngSubmit(){
    console.log(this.formulario.value);
    
  }
}
