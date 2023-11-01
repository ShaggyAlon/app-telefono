import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Sesion } from 'src/app/models/sesion.model';

import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.page.html',
  styleUrls: ['./carga.page.scss'],
})
export class CargaPage implements OnInit {

  lista_sesion: Sesion[] = [];
  usuario2: string = '';
  validador = false;


  constructor(private sesionService:SesionService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.sesionService.ObtenerSesion().then(data => {
        for (let x = 0; x < data.length; x++) {
          this.lista_sesion.push(data[x]);
        }
  
        for (let i = 0; i < this.lista_sesion.length; i++) {
          if (this.lista_sesion[i].VIGENTE.includes('1')) {
            this.validador = true;
            this.usuario2 = this.lista_sesion[i].USUARIO;
          }
        }
  
        if (this.validador) {
          let parametros: NavigationExtras = {
            state: {
              user: this.usuario2
            },
            replaceUrl: true
          }
          this.router.navigate(['principal'], parametros);
        } else {
          
          this.router.navigate(['login']);
        }
  
  
  
      });
    }, 1500);
  }

}

