package com.pesarini.receitas.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.pesarini.receitas.model.Role;

import java.util.UUID;

@Repository
public interface RoleRepository extends MongoRepository<Role, UUID> {
    Role findByName(String name);
}
