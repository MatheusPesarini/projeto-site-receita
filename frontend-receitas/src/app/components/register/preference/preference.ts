import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule, // FormControl é parte do ReactiveFormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
// HttpClient não é mais injetado diretamente aqui para esta funcionalidade
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
// Removido: import { apiUrl } from '../../../../environments/environment'; // Não é mais usado diretamente aqui
import {
  SubmitPreferenceForm,
  UserPreferencesResponse,
} from '../../../services/submit-preference-form'; // Importar o serviço
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-preference',
  imports: [CommonModule, ReactiveFormsModule, MatCheckboxModule, MatButtonModule, MatIconModule],
  templateUrl: './preference.html',
  styleUrl: './preference.css',
})
export class PreferenceComponent implements OnInit {
  preferencesForm!: FormGroup;
  availablePreferences = [
    { id: 'vegetariana', name: 'Vegetariana' },
    { id: 'vegana', name: 'Vegana' },
    { id: 'semGluten', name: 'Sem Glúten' },
    { id: 'semLactose', name: 'Sem Lactose' },
    { id: 'lowCarb', name: 'Low Carb' },
    { id: 'asiatica', name: 'Comida Asiática' },
    { id: 'italiana', name: 'Comida Italiana' },
    { id: 'mexicana', name: 'Comida Mexicana' },
    { id: 'sobremesas', name: 'Sobremesas' },
    { id: 'massas', name: 'Massas' },
    { id: 'frutosDoMar', name: 'Frutos do Mar' },
  ];

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private preferenceService = inject(SubmitPreferenceForm); // Injetar o serviço

  // private apiUrl = `${environment.apiUrl}/user/preferences`; // Removido

  ngOnInit(): void {
    this.preferencesForm = this.fb.group({
      selectedPreferences: this.fb.array(
        this.availablePreferences.map(() => this.fb.control(false)),
      ),
    });
  }

  get selectedPreferencesArray(): FormArray {
    return this.preferencesForm.get('selectedPreferences') as FormArray;
  }

  onSubmitPreferences(): void {
    if (this.preferencesForm.valid) {
      const selectedValues = this.preferencesForm.value.selectedPreferences
        .map((checked: boolean, i: number) => (checked ? this.availablePreferences[i].id : null))
        .filter((value: string | null) => value !== null);

      console.log('Preferências selecionadas para envio:', selectedValues);

      // TODO: Obter o ID do usuário logado.
      // Isso pode vir de um serviço de autenticação, localStorage, etc.
      // Por enquanto, usaremos um ID de exemplo.
      const userId = 'exemploUserId123'; // SUBSTITUA PELA LÓGICA REAL

      if (!userId) {
        console.error('ID do usuário não encontrado. Não é possível salvar preferências.');
        alert('Erro: Não foi possível identificar o usuário para salvar as preferências.');
        return;
      }

      this.preferenceService.saveUserPreferences(userId, selectedValues).subscribe({
        next: (response: UserPreferencesResponse) => {
          console.log('Preferências salvas com sucesso:', response.message);
          alert(response.message || 'Preferências salvas com sucesso!');
          this.router.navigate(['/home']);
        },
        error: (errorMessage: string) => {
          console.error('Erro ao salvar preferências:', errorMessage);
          alert(`Erro ao salvar preferências: ${errorMessage}`);
        },
      });
    } else {
      console.log('Formulário de preferências inválido');
      this.preferencesForm.markAllAsTouched(); // Para mostrar erros de validação se houver
    }
  }
}
