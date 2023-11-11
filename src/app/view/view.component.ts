import { Component } from '@angular/core';
import { ViewService } from '../services/view.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  isCerrar: boolean = false;
  constructor (private view : ViewService){

  }
  close() {
    this.isCerrar = true;
    setTimeout(() => {
      this.view.$modal.emit(false)
    }, 1000)
  }
}
