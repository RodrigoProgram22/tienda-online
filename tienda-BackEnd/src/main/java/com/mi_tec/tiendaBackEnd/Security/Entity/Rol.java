package com.mi_tec.tiendaBackEnd.Security.Entity;

import com.mi_tec.tiendaBackEnd.Security.Enums.RolNombre;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    @Enumerated(EnumType.STRING)
    private RolNombre rolNombre;
    public Rol(){}

    public Rol(RolNombre rolNombre) {
        this.rolNombre = rolNombre;
    }
    
}
