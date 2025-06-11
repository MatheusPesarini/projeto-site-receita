import { inject, Injectable } from '@angular/core';
import { apiUrl } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RegisterDto, RegisterResponseDto } from './dto/dto';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubmitRegisterService {
  private http = inject(HttpClient);

  private apiUrl = apiUrl;

  registerUser(registerData: RegisterDto): Observable<RegisterResponseDto> {
    const registerUrl = `${this.apiUrl}/register`;

    return this.http.post<RegisterResponseDto>(registerUrl, registerData).pipe(
      tap((response: RegisterResponseDto) => {
        console.log('Registration successful:', response);
      }),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro ao registrar o usuário.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro código ${error.status}: ${error.message || error.error?.message || 'Erro do Servidor'}`;

      if (error.status === 400 && error.error?.errors) {
        const validationErrors = Object.values(error.error.errors).join(', ');
        errorMessage = `Erro de validação: ${validationErrors}`;
      } else if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
