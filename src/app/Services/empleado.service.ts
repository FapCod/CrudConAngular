import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { IEmpleado } from '../Models/Empleado';
import { IResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private http = inject(HttpClient);
  private urlApi = appsettings.apiUrl + 'Empleado';
  constructor() { }
  GetEmpleados(){
    return this.http.get<IEmpleado[]>(this.urlApi);
  }
  GetEmpleado(id:number){
    return this.http.get<IEmpleado>(`${this.urlApi}/${id}`);
  }
  InsertEmpleado(empleado: IEmpleado) {
    return this.http.post<IResponseAPI>(this.urlApi, empleado);
  }
  UpdateEmpleado(empleado: IEmpleado) {
    return this.http.put<IResponseAPI>(this.urlApi, empleado);
  }
  DeleteEmpleado(id: number){
    return this.http.delete<IResponseAPI>(`${this.urlApi}/${id}`);
  }
}
