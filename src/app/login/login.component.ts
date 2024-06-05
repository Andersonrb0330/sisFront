import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SeguridadService } from '../service/seguridad.service';
import { Router } from '@angular/router';
import { SeguridadModel } from '../../models/seguridad.model';
import { LoginModel } from '../../models/login.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  seguridadModel!: SeguridadModel;
  formulario!: FormGroup;
  hidePassword: boolean = true; // Propiedad para controlar la visibilidad de la contraseña

  constructor(
    private seguridadService: SeguridadService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      // email: [{ value: 'lil@gmail.com', disabled: true }],
      email: [''],
      password: [''],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  Login() {
    const datos = this.formulario.value;
    const loginModel: LoginModel = {
      id: datos.id,
      email: datos.email,
      password: datos.password,
    };
    // const loginModel: LoginModel = {
    //   email: this.formulario.get('email')!.value,
    //   password: this.formulario.get('password')!.value,
    // };
    this.seguridadService.logueo(loginModel).subscribe((respuesta) => {
      if (respuesta == null) {
        alert('Email o Contraseña Incorrectas');
      } else {
        this.seguridadModel = respuesta;
        this.router.navigate(['/dashboard/alumno']);
      }
    });
  }
}
