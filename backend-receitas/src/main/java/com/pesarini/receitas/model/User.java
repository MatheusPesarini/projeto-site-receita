package com.pesarini.receitas.model;

import com.pesarini.receitas.controller.dto.LoginRequest;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

@Data
@Document(collection = "users")
public class User {
    
    @Id
    private UUID id = UUID.randomUUID();
    
    @NotBlank(message = "Nome não pode ser vazio")
    private String username;
    
    @NotBlank(message = "Email não pode ser vazio")
    @Email
    @Size(max = 255, message = "Email não pode exceder 255 caracteres")
    @Indexed(unique = true)
    private String email;
    
    @NotBlank(message = "Senha não pode ser vazia")
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    private String password;

    private Set<Role> roles;
    private String fotoPerfilUrl;
    private String[] preferenciasCulinarias;
    private String[] receitasFavoritas;
    private String[] receitasCriadas;
    private Integer numeroSeguidores;
    private Integer numeroSeguindo;
    private String[] seguidores;
    private String[] seguindo;
    private String biografia;
    
    @CreatedDate
    private Instant createdDate;
    
    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        return passwordEncoder.matches(loginRequest.password(), this.password);
    }
}
