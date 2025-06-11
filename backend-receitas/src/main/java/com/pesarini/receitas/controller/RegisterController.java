package com.pesarini.receitas.controller;

import com.pesarini.receitas.controller.dto.RegisterStatusResponse;
import com.pesarini.receitas.model.Role;
import com.pesarini.receitas.model.User;
import com.pesarini.receitas.repository.RoleRepository;
import com.pesarini.receitas.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
public class RegisterController {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public RegisterController(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }
    
    @PostMapping("/register")
    public ResponseEntity<RegisterStatusResponse> register(@Valid @RequestBody User user) {
        var emailExists = userRepository.findByEmail(user.getEmail());
        
        if (emailExists.isPresent()) {
            return ResponseEntity.badRequest().body(new RegisterStatusResponse("Email já existe"));
        }
        
        var userExists = userRepository.findByUsername(user.getUsername());

        Role basicRole = roleRepository.findByName(Role.Values.BASIC.name());
        if (userExists.isPresent()) {
            return ResponseEntity.badRequest().body(new RegisterStatusResponse("Usuário já existe"));
        }

        user.setRoles(Set.of(basicRole));
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        userRepository.save(user);

        return ResponseEntity.ok(new RegisterStatusResponse("Usuário registrado com sucesso!"));
    }
}
