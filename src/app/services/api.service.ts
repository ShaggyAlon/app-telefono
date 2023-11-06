import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta = 'https://fer-sepulveda.cl/API_PRUEBA_2/api-service.php';

  constructor(private http: HttpClient  ) { }


  apiPersonaAlmacenar(persona: Persona) {
    return this.http.post(this.ruta, {
      nombreFuncion: 'UsuarioAlmacenar',
      parametros: [
        persona.usuario, 
        persona.email,
        persona.contrasena, 
        persona.nombre, 
        persona.apellido
      ]
    }).pipe();
  }

  apiPersonaLogin (usuario: string, contrasena: string) { 
    return this.http.post(this.ruta, {
      nombreFuncion: 'UsuarioLogin',
      parametros: [
        usuario, contrasena
      ]
    }).pipe();
  }

  apiPersonaModificarContrasena (usuario: string, contrasenaNueva: string, contrasenaActual: string) {
    return this.http.patch(this.ruta, {
      nombreFuncion: 'UsuarioModificarContrasena',
      parametros: [
        usuario, contrasenaNueva, contrasenaActual
      ]
    }).pipe();
  }

} 
