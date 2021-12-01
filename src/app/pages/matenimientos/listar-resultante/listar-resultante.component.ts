import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto.service';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listar-resultante',
  templateUrl: './listar-resultante.component.html',
  styleUrls: ['./listar-resultante.component.css']
})
export class ListarResultanteComponent implements OnInit {
  title = 'angular-app';
  fileName= 'ListarResultantes.xlsx';
  public resultante:any[]=[]
  constructor(private ProductoService:ProductoService) { 
    this.listarResultantes()
  }

  ngOnInit(): void {
  }
  listarResultantes(){
    console.log(this.ProductoService.listarResultante().subscribe(resp=>{
      this.resultante=resp
      console.log(resp)
    }))
    
  }
  eliminarCambios(producto: any) {
    console.log(producto);
    this.ProductoService.eliminarResultante(producto.uid).
      subscribe(resp => {
        this.listarResultantes();
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
