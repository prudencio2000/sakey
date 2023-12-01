export class Question {
    id?:string;
    titulo?: string;
    constructor (args:any = {}){
        this.id = args.id ? args.id : null;
        this.titulo = args.titulo ? args.titulo : null;
    }
}