package com.pesarini.receitas.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.pesarini.receitas.model.Role;

@Repository
public interface RoleRepository extends MongoRepository<Role, Long> {
    Role findByName(String name);
}
