import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  categoriasPopulares = [
    { nome: 'Sobremesas', icone: 'cake', rota: '/receitas/sobremesas' },
    { nome: 'Pratos Principais', icone: 'restaurant_menu', rota: '/receitas/pratos-principais' },
    { nome: 'Saladas', icone: 'spa', rota: '/receitas/saladas' },
    { nome: 'Lanches Rápidos', icone: 'fastfood', rota: '/receitas/lanches' },
  ];

  receitasDestaque = [
    {
      nome: 'Bolo de Chocolate Incrível',
      imagemUrl: 'https://via.placeholder.com/300x200.png?text=Bolo+Chocolate', // Substitua pela URL real
      descricao: 'Um bolo de chocolate fofinho e delicioso para qualquer ocasião.',
      tempoPreparo: '60 min',
      porcoes: '8 porções',
      rota: '/receita/bolo-chocolate-incrivel',
    },
    {
      nome: 'Lasanha à Bolonhesa Clássica',
      imagemUrl: 'https://via.placeholder.com/300x200.png?text=Lasanha', // Substitua pela URL real
      descricao: 'A receita tradicional de lasanha que agrada a todos.',
      tempoPreparo: '90 min',
      porcoes: '6 porções',
      rota: '/receita/lasanha-bolonhesa-classica',
    },
    {
      nome: 'Salada Caesar Fresca',
      imagemUrl: 'https://via.placeholder.com/300x200.png?text=Salada+Caesar', // Substitua pela URL real
      descricao: 'Uma salada leve, crocante e cheia de sabor.',
      tempoPreparo: '20 min',
      porcoes: '4 porções',
      rota: '/receita/salada-caesar-fresca',
    },
  ];
}
