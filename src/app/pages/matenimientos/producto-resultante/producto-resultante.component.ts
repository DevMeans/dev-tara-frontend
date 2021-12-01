import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
@Component({
  selector: 'app-producto-resultante',
  templateUrl: './producto-resultante.component.html',
  styleUrls: ['./producto-resultante.component.css']
})
export class ProductoResultanteComponent implements OnInit {
  public formSubmited = false;
  public registerForm: FormGroup = new FormGroup(
    {
      NumOrdenFab: new FormControl('', [Validators.required, Validators.minLength(5)]),
      numLotePT: new FormControl('', [Validators.required]),
      codigoMaterial: new FormControl('', [Validators.required,]),
      descripcion: new FormControl('', [Validators.required]),
      unidadMedida: new FormControl('',[ Validators.required]),
      cantidad: new FormControl('0', [Validators.required])
    })


  constructor(private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
  }
  crearProductoResultante() {
    this.formSubmited = true;
    console.log(this.registerForm.value)
    if (this.registerForm.valid) {
      this.productoService.crearProductoResultante(this.registerForm.value)
        .subscribe(resp => {
          console.log('ProductoCreado')
          console.log(resp)
          Swal.fire('Success', 'Producto Resultante creado correctamente', 'success')
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
