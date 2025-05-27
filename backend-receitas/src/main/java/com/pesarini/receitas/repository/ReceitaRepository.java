package com.pesarini.receitas.repository;

import com.pesarini.receitas.model.Receita;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReceitaRepository extends MongoRepository<Receita, String> {
}
