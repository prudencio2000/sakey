import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperacionesService } from '../services/operaciones.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit{
  constructor(private router: Router, private operaciones:OperacionesService){
  }
  async ngOnInit() {
    const data:any= await this.operaciones.lsLogin();
    if(data.status && data.data !== undefined){
      this.router.navigate(['/login']);
    }else{
      this.router.navigate(['/registrar']);
    }
  }
  
}
