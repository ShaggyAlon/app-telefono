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

  lista_activa: Sesion[] = [];
  existe: string = '';
  Valido = false;
  constructor( private router: Router, private sesionService:SesionService) { }

  ngOnInit() {
    setTimeout(() => {
      this.sesionService.ObtenerSesion().then(data => {
        for (let x = 0; x < data.length; x++) {
          this.lista_activa.push(data[x]);
        }
  
        for (let i = 0; i < this.lista_activa.length; i++) {
          if (this.lista_activa[i].VIGENTE.includes('1')) {
            this.Valido = true;
            this.existe = this.lista_activa[i].USUARIO;
          }
          console.log('PASASTEBPOR AQUI')
        }
  
        if (this.Valido) {
          let parametros: NavigationExtras = {
            
            replaceUrl: true,
            state: {
              user: this.existe
            }
            
          }
          this.router.navigate(['principal'], parametros);
          console.log('la hiciste hermano')
        } else {
          console.log('ya basta elessss')
          this.router.navigate(['login']);
        }
  
  
  
      });
    }, 1500);
  }
  }


