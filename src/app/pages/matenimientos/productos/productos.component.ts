import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  public formSubmited = false;
  public registerForm: FormGroup = new FormGroup(
    {
      NumOrdenFab: new FormControl('', [Validators.required, Validators.minLength(5)]),
      numLoteMP: new FormControl('', [Validators.required]),
      codigoMaterial: new FormControl('', [Validators.required,]),
      descripcion: new FormControl('', [Validators.required]),
      unidadMedida: new FormControl('',[ Validators.required]),
      cantidad: new FormControl('0', [Validators.required])
    })


  constructor(private productoService: ProductoService, private router: Router) {
    productoService.crearProducto('hola')
  }

  ngOnInit(): void {
  }
  crearProducto() {
    this.formSubmited = true;
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      this.productoService.crearProducto(this.registerForm.value)
        .subscribe(resp => {
          console.log('ProductoCreado')
          console.log(resp)
          Swal.fire('Success', 'Producto creado correctamente', 'success')
          this.router.navigateByUrl('/dashboard')

        }, (err) => {
          Swal.fire('Error', err.error.errors[0].msg, 'error')
        }
          /*console.warn(err.error.errors[0].msg)*/
        )
    } else {
      console.log('Formulario no es correcto')
    }
  }
  campoNoValido(campo: string) {
    let x = this.registerForm.get(campo) as FormControl

    if (x.invalid && this.formSubmited) {
      return true;
    } else {
      return false;
    }
  }
}
