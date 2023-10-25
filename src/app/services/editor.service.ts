import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  $modal = new EventEmitter<any>();
  $data:any | null =  null
  constructor() { }
}
