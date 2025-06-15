import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { apiUrl } from '../../environments/environment'; // Corrigido para importar 'environment'

// Interface para os dados que o backend espera (opcional, mas bom para tipagem)
export interface UserPreferencesPayload {
  // userId: string; // Se você precisar enviar o ID do usuário explicitamente
  preferences: string[]; // Array de IDs/nomes das preferências
}

// Interface para a resposta do backend (opcional)
export interface UserPreferencesResponse {
  message: string;
  // outros campos que o backend possa retornar
}

@Injectable({
  providedIn: 'root',
})
export class SubmitPreferenceForm {
  private http = inject(HttpClient);
  // Ajuste o caminho do endpoint conforme sua API
  // Exemplo: /users/preferences ou /preferences
  // Se o ID do usuário fizer parte da URL, você o adicionará no método.
  private preferencesApiUrl = `${apiUrl}/users`; // Exemplo: http://localhost:8080/api/users

  // Método para salvar/atualizar as preferências do usuário
  // Você pode precisar passar o ID do usuário ou o backend pode obtê-lo do token JWT
  saveUserPreferences(userId: string, preferences: string[]): Observable<UserPreferencesResponse> {
    // Exemplo de URL: POST para /api/users/{userId}/preferences
    const url = `${this.preferencesApiUrl}/${userId}/preferences`;
    const payload: UserPreferencesPayload = { preferences };

    return this.http.post<UserPreferencesResponse>(url, payload).pipe(
      tap((response) => console.log('Preferências salvas com sucesso via serviço:', response)),
      catchError(this.handleError),
    );
  }

  // Você pode ter um método PUT se for para atualizar preferências existentes
  // updateUserPreferences(userId: string, preferences: string[]): Observable<UserPreferencesResponse> {
  //   const url = `${this.preferencesApiUrl}/${userId}/preferences`;
  //   const payload: UserPreferencesPayload = { preferences };
  //   return this.http.put<UserPreferencesResponse>(url, payload).pipe(
  //     tap(response => console.log('Preferências atualizadas com sucesso via serviço:', response)),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro ao salvar as preferências.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro do cliente: ${error.error.message}`;
    } else {
      errorMessage = `Erro do servidor código ${error.status}: ${error.message || error.error?.message || 'Erro desconhecido'}`;
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
