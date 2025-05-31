package com.pesarini.receitas.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "roles")
public class Role {
    
    @Id
    private Long roleId;
    private String name;

    public Role(String name) {
        this.name = name;
    }

    public enum Values {

        ADMIN(1L),
        BASIC(2L);

        final long roleId;

        Values(long roleId) {
            this.roleId = roleId;
        }

        public long getRoleId() {
            return roleId;
        }
    }
}
