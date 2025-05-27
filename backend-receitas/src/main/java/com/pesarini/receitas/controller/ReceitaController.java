package com.pesarini.receitas.controller;

import com.pesarini.receitas.model.Receita;
import com.pesarini.receitas.repository.ReceitaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/receitas")
public class ReceitaController {
    
    private final ReceitaRepository receitaRepository;
    
    public ReceitaController(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }
    
    @GetMapping
    public List<Receita> listarReceitas() {
        return receitaRepository.findAll();
    }
    
    public Receita criarReceita(@RequestBody Receita receita) {
        return receitaRepository.save(receita);
    }
}
