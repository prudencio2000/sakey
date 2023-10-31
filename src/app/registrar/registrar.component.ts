import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SelectorComponent } from '../items/selector/selector.component';
import { SelectorService } from '../services/selector.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IpcService } from '../services/ipc.service';
import { Question } from '../class/questions.class';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  tipo: string = "password";
  isVer: boolean = false;
  @ViewChild(SelectorComponent) SelectorComponent: SelectorComponent | any;
  formulario: FormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required)
  });
  preguntasSeleccionada: any = [];
  @ViewChild (SelectorComponent) selectron : SelectorComponent | any;
  preguntasSeguridad: Question [] = [];
  constructor(private selector: SelectorService, private cdr: ChangeDetectorRef, private ipcService: IpcService) { }
  ngOnInit(): void {
    this.ipcService.send('ls-questions', {});

    this.ipcService.on('ls-questions-respuesta', (event: any, arg: any) => {
      if(arg.status){
        this.preguntasSeguridad = arg.data
        this.selectron.actualizarDatos(this.preguntasSeguridad)
      }
   
      
    })
    this.selector.$modal.subscribe({
      next: (data: any) => {
        this.preguntasSeleccionada.push(data);
    
        this.formulario.addControl(`question_${data.id}`, new FormControl('', Validators.required));
      }
    })
  }
  verPassword() {
    if (!this.isVer) {
      this.tipo = "text";
    } else {
      this.tipo = "password"
    }
    this.isVer = !this.isVer;
  }
  ngSubmit() {
    console.log(this.formulario.value);

  }
}
