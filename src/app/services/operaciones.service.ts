import { Injectable } from '@angular/core';
import { IpcService } from './ipc.service';

@Injectable({
  providedIn: 'root'
})
export class OperacionesService {

  constructor(private ipcService: IpcService) { }

  async registrarLogin(datos: any): Promise<any> {
    this.ipcService.send('registrar-login', datos);
    return new Promise((resolve: any) => {
      this.ipcService.on('registrar-login-respuesta', (event: any, data: any) => {
        resolve(data);
      })
    })
  }

  async registrarQuestion (datos:any) : Promise <any> {
    this.ipcService.send('registrar-respuesta',datos);
    return new Promise((resolve: any) => {
      this.ipcService.on('registrar-respuesta-respuesta', (event: any, data: any) => {
        resolve(data);
      })
    })
  }
  async lsLogin(): Promise<any> {
    this.ipcService.send('ls-login', {});
    return new Promise((resolve: any) => {
      this.ipcService.on('ls-login-respuesta', (event: any, data: any) => {
        resolve(data);
      })
    })
  }
  async lsQuestion ():Promise<any> {
    this.ipcService.send('ls-questions', {});
    return new Promise ((resolve:any)=>{
      this.ipcService.on('ls-questions-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }
  async entrar (password:string):Promise<any> {
    this.ipcService.send('entrar', password);
    return new Promise ((resolve:any)=>{
      this.ipcService.on('entrar-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }

  async registrarKey (datos:any):Promise<any>{
    this.ipcService.send('registrar-key',datos)
    return new Promise ((resolve)=>{
      this.ipcService.on('registrar-key-save',(event:any, arg:any)=>{
        resolve(arg)
      })
    })
  }

  async lsKey ():Promise<any>{
    this.ipcService.send('ls-key')
    return new Promise ((resolve)=>{
      this.ipcService.on('savekey-respuesta',(event:any, arg:any)=>{
        resolve(arg)
      })
    })
  }

}
