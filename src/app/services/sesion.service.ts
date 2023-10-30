import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS SESION (USUARIO VARCHAR(20), VIGENTE VARCHAR(1))', [])
          .then(() => console.log('FSR: TABLA CREADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })

      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }



  // Obtendra sesion para validar si el usuario oprimiop logout
  ObtenerSesion() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT USUARIO, VIGENTE FROM SESION', [])
          .then((data) => {
            let lista_sesion = [];

            for (let x = 0; x < data.rows.length; x++) {
              lista_sesion.push(data.rows.item(x));
            }

            return lista_sesion;
          })
          .catch(e => {
            return []
          });
      })
      .catch(e => {
        return []
      });
  }
  // al iniciar sesion esta tabla se cra con el usuario y un dato 
  nuevaSesion(nombre: string, vigente: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO SESION (USUARIO, VIGENTE) VALUES (?, ?)', [nombre, vigente])
          .then(() => console.log('FSR: SESION CREADA'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  sesionActual(vigente: string, user: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE SESION SET VIGENTE = ? WHERE USUARIO = ?', [vigente, user])
          .then(() => console.log('FSR: SESION ACTUALIZADA'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

}
