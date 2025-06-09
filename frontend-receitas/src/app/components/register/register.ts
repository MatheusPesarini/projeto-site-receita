import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
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

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  usernameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        email: this.emailFormControl, // Você pode definir os FormControls aqui diretamente também
        username: this.usernameFormControl,
        password: this.passwordFormControl,
        confirmPassword: this.confirmPasswordFormControl,
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
    } else {
      console.log('Formulário inválido');
      this.registerForm.markAllAsTouched();
    }
  }
}
