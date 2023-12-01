import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  $modal = new EventEmitter<any>();
  $id = new EventEmitter<any>();
  
  constructor() { }
}
