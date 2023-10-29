import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS PERSONA(NOMBRE VARCHAR(20), APELLIDO VARCHAR(20),TELEFONO INTEGER, EMAIL VARCHAR(20), CONTRASENA VARCHAR(20))', [])
          .then(() => console.log('FSR: TABLA CREADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  almacenarPersona(nombre: string, apellido: string, telefono: number, email: string, contrasena: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO PERSONA VALUES(?, ?, ?, ?, ?)', [nombre, apellido, telefono, email,contrasena ])
          .then(() => console.log('FSR: PERSONA ALMACENADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }



  obtenerTodasLasPersonas() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT NOMBRE, APELLIDO, TELEFONO, EMAIL, CONTRASENA FROM PERSONA', [])
          .then((data) => {
            let lista_personas = [];

            for (let x = 0; x < data.rows.length; x++) {
              lista_personas.push(data.rows.item(x));
            }

            return lista_personas;
          })
          .catch(e => {
            return []
          });
      })
      .catch(e => {
        return []
      });
  }

  actualizarPersona(nombre: string, nuevaContrasena: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE PERSONA SET CONTRASENA = ? WHERE NOMBRE = ?', [nuevaContrasena, nombre])
          .then(() => console.log('FSR: PERSONA ACTUALIZADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }
  


}
