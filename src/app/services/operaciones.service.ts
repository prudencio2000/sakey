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

  async registrarQuestion(datos: any): Promise<any> {
    this.ipcService.send('registrar-respuesta', datos);
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
  async lsQuestion(): Promise<any> {
    this.ipcService.send('ls-questions', {});
    return new Promise((resolve: any) => {
      this.ipcService.on('ls-questions-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }
  async entrar(password: string): Promise<any> {
    this.ipcService.send('entrar', password);
    return new Promise((resolve: any) => {
      this.ipcService.on('entrar-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }

  async registrarKey(datos: any): Promise<any> {
    this.ipcService.send('registrar-key', datos)
    return new Promise((resolve) => {
      this.ipcService.on('registrar-key-save', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }

  async lsKey(): Promise<any> {
    this.ipcService.send('ls-key')
    return new Promise((resolve) => {
      this.ipcService.on('savekey-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }
  async deleteKey(id: string): Promise<any> {
    this.ipcService.send('delete-key', id)
    return new Promise((resolve) => {
      this.ipcService.on('delete-key-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }
  async questionValidacion(): Promise<any> {
    this.ipcService.send('preguntas-validacion')
    return new Promise((resolve) => {
      this.ipcService.on('preguntas-validacion-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }
  async updatePassword(datos: any): Promise<any> {
    this.ipcService.send('update-login', datos)
    return new Promise((resolve) => {
      this.ipcService.on('update-login-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }

  async lsOneKey(datos: any) {
    this.ipcService.send('ls-one', datos);
    return new Promise((resolve) => {
      this.ipcService.on('ls-one-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }
  async updateSave(datos: any) {
    this.ipcService.send('update-save', datos);
    return new Promise((resolve) => {
      this.ipcService.on('update-save-respuesta', (event: any, arg: any) => {
        resolve(arg)
      })
    })
  }
}
