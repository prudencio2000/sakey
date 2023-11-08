import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  $modal = new EventEmitter<any>();
  constructor() { }
  
}
