import { ChangeDetectionStrategy,Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { IEmpleado } from '../../Models/Empleado';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class InicioComponent {
  private empleadoService = inject(EmpleadoService);
  public empleados:IEmpleado[] = [];
  public displayedColumns: string[] = ['idEmpleado', 'nombreCompleto', 'correo', 'sueldo', 'fechaContrato', 'Acciones'];
  GetEmpleados(){
    this.empleadoService.GetEmpleados().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.empleados = data;
          console.log(this.empleados);
        }
      },
      error: (err) => console.error('Error al obtener los empleados', err)
    }
   );
  }
  constructor( private router:Router){
    this.GetEmpleados();
  }
  NuevoEmpleado(){
    this.router.navigate(['/Empleado',0]);
  }
  Editar(empleado: IEmpleado){
    this.router.navigate(['/Empleado', empleado.idEmpleado]);
  }
  Eliminar(empleado:IEmpleado){
    if(confirm("Desea eliminar el empleado " + empleado.nombreCompleto)){
      this.empleadoService.DeleteEmpleado(empleado.idEmpleado).subscribe({
        next: (data) => {
          if(data.isSuccess){
            this.GetEmpleados();
          }else{
            alert("Error al eliminar el empleado "+ empleado.nombreCompleto);
          }
        },
        error: (err) => console.error('Error al eliminar el empleado', err)
      });
    }
  }
}
