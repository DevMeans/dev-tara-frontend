import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  title = 'angular-app';
  fileName= 'ListarProductos.xlsx';
  public productos: any[] = []
  constructor(private ProductoService: ProductoService) {

    this.listarProductos()

  }

  ngOnInit(): void {

  }
  listarProductos() {
    console.log(this.ProductoService.listarProduco().subscribe(resp => {
      this.productos = resp
      console.log(resp)
    }))

  }
  eliminarCambios(producto: any) {
    console.log(producto);
    this.ProductoService.eliminarProducto(producto.uid).
      subscribe(resp => {
        this.listarProductos();
        Swal.fire('borrado', producto.descripcion, 'success');
      })

  }
  exportexcel(): void
  {
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
  }

}
