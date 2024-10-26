import { Component, inject, OnInit, Input} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,Validators,ReactiveFormsModule} from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';
import { IEmpleado } from '../../Models/Empleado';
@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit {
  @Input("id") idEmpleado: number =0;
  private empleadoServicio = inject(EmpleadoService);
  public formBuilder = inject(FormBuilder);
  public empleadoForm: FormGroup = this.formBuilder.group({
    nombreCompleto: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]], // Validación de correo
    sueldo: [0, Validators.required],
    fechaContrato: ['', Validators.required]
  })

  constructor(private router:Router) {}
  ngOnInit():void{
      if(this.idEmpleado != 0){
        this.empleadoServicio.GetEmpleado(this.idEmpleado).subscribe(
          {
            next: (data) => {
                this.empleadoForm.patchValue(
                  {
                    nombreCompleto: data.nombreCompleto,
                    correo: data.correo,
                    sueldo: data.sueldo,
                    fechaContrato: data.fechaContrato
                  }
                )
            },
            error: (error) => {
              console.error(error);
            }
          }
        )
      }
  }
  guardar(){
    const empleado:IEmpleado ={
      idEmpleado: this.idEmpleado,
      nombreCompleto: this.empleadoForm.value.nombreCompleto,
      correo: this.empleadoForm.value.correo,
      sueldo: this.empleadoForm.value.sueldo,
      fechaContrato: this.empleadoForm.value.fechaContrato
    }

    if(this.idEmpleado == 0){
      this.empleadoServicio.InsertEmpleado(empleado).subscribe(
        {
          next: (data) => {
            if(data.isSuccess){
              this.router.navigate([""]);
            }else{
              alert("Error al crear")
            }
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
    }else{
      this.empleadoServicio.UpdateEmpleado(empleado).subscribe(
        {
          next: (data) => {
            if(data.isSuccess){
              this.router.navigate([""]);
            }else{
              alert("Error al actualizar")
            }
          },
          error: (error) => {
            console.error(error);
          }
        }
      )
    }

  }
  volver(){
    this.router.navigate(["/"]);
  }

}
