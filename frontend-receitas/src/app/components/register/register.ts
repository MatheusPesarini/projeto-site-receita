import { Component, OnInit, inject } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  FormBuilder,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SubmitRegisterService } from '../../services/submit-register-form';
import { RegisterDto, RegisterResponseDto } from '../../services/dto/dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private submitRegisterForm = inject(SubmitRegisterService);

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator },
    );
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      if (form.get('confirmPassword')?.hasError('mismatch')) {
        form.get('confirmPassword')?.setErrors(null);
      }
      return null;
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log('Formulário válido:', this.registerForm.value);

      const formValues = this.registerForm.value;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirmPassword, ...rest } = formValues;
      const payload = rest as RegisterDto;

      this.submitRegisterForm.registerUser(payload).subscribe({
        next: (response: RegisterResponseDto) => {
          console.log('Resposta do servidor:', response);
          this.router.navigate(['/register/preference']);
        },
        error: (error: string) => {
          console.error('Erro ao registrar usuário:', error);
          alert(error || 'Erro ao registrar usuário');
        },
        complete: () => {
          console.log('Registro concluído');
        },
      });
    } else {
      console.log('Formulário inválido');
      this.registerForm.markAllAsTouched();
    }
  }
}
