import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginServiceService } from '../../servicios/login-service.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  providers: [CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loading!: boolean;
  public loginForm!: FormGroup;
  cookieData: any = [];
  mensageError: any;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private loginServiceService: LoginServiceService,
    private render2: Renderer2,
    private cookieService: CookieService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  get Email() {
    return this.loginForm.get('email');
  }

  get Password() {
    return this.loginForm.get('password');
  }

  login(event: Event) {
    this.loading = true;
    event.preventDefault;
    this.loginServiceService
      .iniciarSesion(this.loginForm.value)
      .subscribe((data) => {
        // console.log("DATA: " + JSON.stringify(data));
        this.router.navigate(['/dashboard/enterprise']);
        this.cookieData = JSON.parse(data);
        this.cookieService.set(
          'usuarioToken',
          JSON.stringify(this.cookieData[0])
        );
        this.cookieService.set('usuarioNombre', this.cookieData[1]);
      });
  }

  /*
login(event: Event) {
  this.loading = true;
  event.preventDefault;
  this.loginServiceService.iniciarSesion(this.loginForm.value).subscribe({
   next:data => {
  // this.router.navigate(['/dashboard/enterprise']);
   this.cookieData = JSON.parse(data);
   this.cookieService.set('usuarioToken', JSON.stringify(this.cookieData[0]));
   this.cookieService.set('usuarioNombre', this.cookieData[1]);
   },
   error: err => {
    console.log(err.console.error.msg)
   }
  })
}
*/

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
