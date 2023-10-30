import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta = 'https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php';

  constructor(private http: HttpClient  ) { }


  personaAlmacenar (usuario: string, correo: string, contrasena: string, nombre: string, apellido: string) {
    return this.http.post(this.ruta, {
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [
        usuario, correo, contrasena, nombre, apellido
      ]
    }).pipe();
  }

  personaLogin (usuario: string, contrasena: string) { 
    return this.http.post(this.ruta, {
      nombreFuncion: 'UsuarioLogin',
      parametros: [
        usuario, contrasena
      ]
    }).pipe();  
  }

  personaModificarContrasena (usuario: string, contrasenaNueva: string, contrasenaActual: string) {
    return this.http.patch(this.ruta, {
      nombreFuncion: 'UsuarioModificarContrasena',
      parametros: [
        usuario, contrasenaNueva, contrasenaActual
      ]
    }).pipe();
  }

} 
