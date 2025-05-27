package com.pesarini.receitas.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "receitas")
public class Receita {
    @Id
    private String id;
    private String nome;
    private String descricao;
    private String categoria;
    private Integer tempoPreparo;
    private String[] ingredientes;
    private String[] passos;
    private String imagemUrl;
    private String usuarioId;
    private Integer avaliacaoMedia;
    private Integer numeroAvaliacoes;
}
