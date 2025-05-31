package com.pesarini.receitas.config;

import com.pesarini.receitas.model.Role;
import com.pesarini.receitas.model.User;
import com.pesarini.receitas.repository.RoleRepository;
import com.pesarini.receitas.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Configuration
public class RolesConfig implements CommandLineRunner {
    
    private RoleRepository roleRepository;
    
    private UserRepository userRepository;
    
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    public RolesConfig(RoleRepository roleRepository, UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    @Override
    @Transactional
    public void run(String... args) throws Exception {
        var roleAdmin = roleRepository.findByName(Role.Values.ADMIN.name());

        var userAdmin = userRepository.findByUsername("admin");
        
        userAdmin.ifPresentOrElse(
                user -> {
                    System.out.println("Admin já existe");
                    },
                () -> {
                    var user = new User();
                    user.setUsername("admin");
                    user.setPassword(bCryptPasswordEncoder.encode("admin"));
                    user.setRoles(Set.of(roleAdmin));
                    userRepository.save(user);
                }
        );
    }
}
