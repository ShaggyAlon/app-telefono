import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CambiarContrasenaPage } from './cambiar-contrasena.page';

describe('CambiarContrasenaPage', () => {
  let component: CambiarContrasenaPage;
  let fixture: ComponentFixture<CambiarContrasenaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CambiarContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
