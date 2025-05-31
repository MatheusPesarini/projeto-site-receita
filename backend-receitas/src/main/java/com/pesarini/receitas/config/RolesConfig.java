package com.pesarini.receitas.config;

import com.pesarini.receitas.model.Role;
import com.pesarini.receitas.model.User;
import com.pesarini.receitas.repository.RoleRepository;
import com.pesarini.receitas.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
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
        Role adminRole = roleRepository.findByName(Role.Values.ADMIN.name());
        if (adminRole == null) {
            adminRole = new Role(Role.Values.ADMIN.name());
            adminRole.setRoleId(Role.Values.ADMIN.getRoleId()); // Defina o ID da role
            roleRepository.save(adminRole);
            System.out.println("Role ADMIN criada.");
        }

        Role basicRole = roleRepository.findByName(Role.Values.BASIC.name());
        if (basicRole == null) {
            basicRole = new Role(Role.Values.BASIC.name());
            basicRole.setRoleId(Role.Values.BASIC.getRoleId()); // Defina o ID da role
            roleRepository.save(basicRole);
            System.out.println("Role BASIC criada.");
        }

        Optional<User> userAdminOpt = userRepository.findByUsername("admin");

        if (userAdminOpt.isEmpty()) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@gmail.com"); 
            adminUser.setPassword(bCryptPasswordEncoder.encode("admin"));
            adminUser.setRoles(Set.of(adminRole)); 
            userRepository.save(adminUser);
            System.out.println("Usuário admin criado.");
        } else {
            System.out.println("Usuário admin já existe.");
        }
    }
}
