import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Persona } from '../models/persona.model';

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
        db.executeSql('CREATE TABLE IF NOT EXISTS PERSONA(NOMBRE VARCHAR(20), APELLIDO VARCHAR(20), USUARIO VARCHAR(20), EMAIL VARCHAR(20), CONTRASENA VARCHAR(20))', [])
          .then(() => console.log('FSR: TABLA CREADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  dbAlmacenarPersona(persona: Persona) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO PERSONA (NOMBRE, APELLIDO, USUARIO, EMAIL, CONTRASENA ) VALUES(?, ?, ?, ?, ?)', [persona.nombre, persona.apellido, persona.usuario, persona.email, persona.contrasena])
          .then(() => console.log('FSR: PERSONA ALMACENADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  // selectTabla(){
  //   this.sqlite.create({
  //     name: 'data.db',
  //     location: 'default'
  //   }).then((db: SQLiteObject) => {
  //     return db.executeSql('SELECT USUARIO, EMAIL,CONTRASENA FROM PERSONA', [])
  //     .then((data) => {
  //       if (data.rows.length > 0) {
  //         for (let i = 0; i < data.rows.length; i++) {
  //           console.log('Fila ' + i + ':', data.rows.item(i));
  //         }
  //       } else {
  //         console.log('La tabla PERSONA está vacía.');
  //       }
  //     }).catch(e => console.error('Error al ejecutar la consulta: ' + JSON.stringify(e)));
  //   }).catch(e => console.error('Error al abrir la base de datos: ' + JSON.stringify(e)));
  // }

  dbObtenerTodasLasPersonas() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default',
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT NOMBRE, APELLIDO, USUARIO, EMAIL, CONTRASENA FROM PERSONA', [])
          .then((data) => {
            let lista_personas = [];

            for (let x = 0; x < data.rows.length; x++) {
              lista_personas.push(data.rows.item(x));
            }

            return lista_personas;
          })
          .catch(e => {
            return [];
          });
      })
      .catch(e => {
        return [];
      });
  }

  dbActualizarPersona(usuario: string, nuevaContrasena: string) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('UPDATE PERSONA SET CONTRASENA = ? WHERE USUARIO = ?', [nuevaContrasena, usuario])
          .then(() => console.log('FSR: PERSONA ACTUALIZADA OK'))
          .catch(e => console.log('FSR: ' + JSON.stringify(e)));
      })
      .catch(e => console.log('FSR: ' + JSON.stringify(e)));
  }

  // VALIDAR
  //Hace un select a tabla persona, si la encurntra crea una lsita y las almacena.
  // Si no encuentra nada devuelve una lsita vacia
  dbPersonaValidar(usuario: string) {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT NOMBRE, APELLIDO, USUARIO, EMAIL, CONTRASENA FROM PERSONA WHERE USUARIO = ?', [usuario])
          .then((data) => {
            let lista_validarU: Persona[] = [];

            for (let x = 0; x < data.rows.length; x++) {
              lista_validarU.push(data.rows.item(x));
            }

            return [lista_validarU[0].nombre, lista_validarU[0].apellido, lista_validarU[0].usuario,
            lista_validarU[0].email, lista_validarU[0].contrasena];

          })
          .catch(e => {
            return []
          });
      })
      .catch(e => {
        return []
      });
  }
}