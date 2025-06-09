import { Component, inject, OnInit } from '@angular/core'; // Adicionado OnInit
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup, // Adicionado FormGroup
  FormBuilder, // Adicionado FormBuilder
} from '@angular/forms';
// FormGroupDirective, NgForm e ErrorStateMatcher podem ser removidos se MyErrorStateMatcher não for usado
// ou se a validação padrão for suficiente.
// import { FormGroupDirective, NgForm } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider'; // Mantido caso use
import { RouterLink } from '@angular/router';

// MyErrorStateMatcher pode ser removido se não estiver sendo usado para customizar
// a exibição de erros além do comportamento padrão.
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-login',
  standalone: true, // Adicione standalone: true se ainda não estiver
  imports: [
    FormsModule, // Pode ser removido se usar apenas ReactiveFormsModule
    ReactiveFormsModule, // Essencial para FormGroup
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule, // Mantido caso use
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  // Implemente OnInit
  loginForm!: FormGroup; // Declara o FormGroup

  // MyErrorStateMatcher não é mais necessário aqui se usarmos a abordagem padrão de FormGroup
  // matcher = new MyErrorStateMatcher();

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Define o FormControl 'email'
      password: ['', [Validators.required, Validators.minLength(6)]], // Define o FormControl 'password'
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login Form Válido:', this.loginForm.value);
      // Aqui você adicionaria a lógica para autenticar o usuário
      // Ex: this.authService.login(this.loginForm.value).subscribe(...);
    } else {
      console.log('Login Form Inválido');
      // Marcar todos os campos como tocados para exibir mensagens de erro
      this.loginForm.markAllAsTouched();
    }
  }
}
