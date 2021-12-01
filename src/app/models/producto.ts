

export class producto {
    constructor(

       public nombre:string,
       public codigo:string,
       public password:string,

       public uid?:string,
       public estado?:string,
      
      
    ) {
        
    }
    imprimirUsuario(){
        console.log(this.nombre)
    }
}