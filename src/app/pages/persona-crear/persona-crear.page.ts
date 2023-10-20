import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-persona-crear',
  templateUrl: './persona-crear.page.html',
  styleUrls: ['./persona-crear.page.scss'],
})
export class PersonaCrearPage implements OnInit {

  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_telefono: string = '';
  mdl_email: string = '';
  mdl_contrasena: string = '';

  cantidad: number = 0;

  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
    this.dbService.obtenerCantidadPersonas().then(data => {
      this.cantidad = data;
    })
  }

  almacenarPersona() {
    this.dbService.almacenarPersona(
      this.mdl_nombre,
      this.mdl_apellido,
      Number(this.mdl_telefono),
      this.mdl_email,
      this.mdl_contrasena
    
      );
    this.dbService.obtenerCantidadPersonas().then(data => {
      this.cantidad = data;
    })
  }
volver(){
  this.router.navigate(['login']);
}
  irListarPersonas() {
    this.router.navigate(['listar']);
  }







}
