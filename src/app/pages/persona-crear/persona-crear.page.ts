import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-persona-crear',
  templateUrl: './persona-crear.page.html',
  styleUrls: ['./persona-crear.page.scss'],
})
export class PersonaCrearPage implements OnInit {

  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_telefono: number = 56;
  mdl_email: string = '';
  mdl_contrasena: string = '';
  // ALERTA
  isAlertOpen = false;
  alertButtons = ['OK'];
  mdl_message: string = '';

  cantidad: number = 0;

  lista_personas: Persona[] = [];
  usuario: string = '';
  apellido: string = '';
  contra: string = '';


  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
    
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.lista_personas = parametros?.extras.state['lista_personas'];
      this.usuario = parametros?.extras.state['user'];
      this.apellido = parametros?.extras.state['apellidol'];
      this.contra = parametros?.extras.state['pass'];
      // console.log([this.apellido])
      // console.log([this.usuario]);
      // console.log([this.contra]);
      console.log([this.lista_personas])
    }
    this.dbService.obtenerTodasLasPersonas().then(data => {
      for (let x = 0; x < data.length; x++) {
        this.lista_personas.push(data[x]);
      }
    })
  
}

  almacenarPersona() {
    if (this.mdl_nombre === '' || this.mdl_apellido === '' || this.mdl_telefono === 0
      || this.mdl_email === '' || this.mdl_contrasena === '') {
      console.log("estan vacios")
      this.mdl_message = "Campos Vacios";
      this.isAlertOpen = true;
    } else {
      console.log("me almacene")
      this.dbService.almacenarPersona(
        this.mdl_nombre,
        this.mdl_apellido,
        Number(this.mdl_telefono),
        this.mdl_email,
        this.mdl_contrasena
      );
      let paramatros: NavigationExtras = {
        replaceUrl: true,
        state: {
          
          user: this.mdl_nombre,
          pass: this.mdl_contrasena,
          apellidol: this.mdl_apellido
        }
      }
      console.log([this.mdl_apellido])
      this.router.navigate(['login'],paramatros);
      // Limpia los campos del formulario
      this.mdl_nombre = '';
      this.mdl_apellido = '';
      this.mdl_telefono = 56;
      this.mdl_email = '';
      this.mdl_contrasena = '';
    }
  }
  volver() { 
    let paramatros: NavigationExtras = {
    replaceUrl: true,
    state: {
      
      user: this.mdl_nombre,
      pass: this.mdl_contrasena,
      apellidol: this.mdl_apellido
    }
  }
    this.router.navigate(['login'],paramatros);
  }
  irListarPersonas() { 
    let paramatros: NavigationExtras = {
    replaceUrl: true,
    state: {
      
      user: this.mdl_nombre,
      pass: this.mdl_contrasena,
      apellidol: this.mdl_apellido
    }
  }
  this.router.navigate(['listar'],paramatros);
  }
  





  /* ALERTA */
  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
