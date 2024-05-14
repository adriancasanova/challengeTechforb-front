import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroService } from '../../servicios/registro.service';
import { Usuario } from '../../models/usuario';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  loading = false;
  formularioRegistro: any;
  registroUsuarioModel: Usuario = new Usuario();
  dniError: any;
  nombreError: any;
  passwordlErrorlength: any;
  apellidoError: any;
  emailErrorEmpty: any;
  emailErrorlength: any;
  hayMensajesDeError: boolean = false;
  passwordlErrorEmpty: any;
  constructor(
    private formBuilder: FormBuilder,
    private registroUsuario: RegistroService,
    private render2: Renderer2,
    private router: Router
  ) {
    this.formularioRegistro = this.formBuilder.group({
      email: [''],
      password: [''],
      nombre: [''],
      apellido: [''],
      dni: [''],
    });
  }

  registrarUsuario(event: Event) {
    this.loading = true;
    this.registroUsuarioModel.nombre = this.formularioRegistro.value.nombre;
    this.registroUsuarioModel.apellido = this.formularioRegistro.value.apellido;
    this.registroUsuarioModel.dni = this.formularioRegistro.value.dni;
    this.registroUsuarioModel.email = this.formularioRegistro.value.email;
    this.registroUsuarioModel.password = this.formularioRegistro.value.password;
    this.registroUsuario.registroUsuario(this.registroUsuarioModel).subscribe({
      next: (data) => {
        this.formularioRegistro.reset();
        alert('registro exitoso. Ya puede iniciarse sesion');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        for (let i = 0; i < err.error.errors.length; i++) {
          if (
            err.error.errors[i] ==
            'El email debe tener entre 5 y 20 caracteres.'
          ) {
            this.emailErrorlength = err.error.errors[i];
            console.log(err.error.errors[i]);
            this.hayMensajesDeError = true;
          }
          if (err.error.errors[i] == 'El email no puede estar vacio.') {
            this.emailErrorEmpty = err.error.errors[i];
            console.log(err.error.errors[i]);
            this.hayMensajesDeError = true;
          }
          if (err.error.errors[i] == 'La contraseña no puede estar vacio.') {
            this.passwordlErrorEmpty = err.error.errors[i];
            console.log(err.error.errors[i]);
            this.hayMensajesDeError = true;
          }
          if (
            err.error.errors[i] ==
            'La contraseña debe tener entre 5 y 20 caracteres.'
          ) {
            this.passwordlErrorlength = err.error.errors[i];
            console.log(err.error.errors[i]);
            this.hayMensajesDeError = true;
          }
          if (err.error.errors[i] == 'El nombre campo es requerido.') {
            this.nombreError = err.error.errors[i];
            console.log(err.error.errors[i]);
            this.hayMensajesDeError = true;
          }
          if (err.error.errors[i] == 'El dni campo es requerido.') {
            this.dniError = err.error.errors[i];
            console.log(err.error.errors[i]);
            this.hayMensajesDeError = true;
          }
          if (err.error.errors[i] == 'El apellido campo es requerido.') {
            this.apellidoError = err.error.errors[i];
            console.log(err.error.errors[i]);
            this.hayMensajesDeError = true;
          }
        }
      },
    });
  }

  @ViewChild('inputAText') inputATexts!: ElementRef;
  @ViewChild('eyeVisivility') eyeVisivilitys!: ElementRef;
  changeEye(): void {
    const inputText = this.inputATexts.nativeElement;
    const eye = this.eyeVisivilitys.nativeElement;
    if (inputText.type === 'password') {
      this.render2.setAttribute(inputText, 'type', 'text');
    } else {
      this.render2.setAttribute(inputText, 'type', 'password');
    }
  }
}
