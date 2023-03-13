package com.mi_tec.tiendaBackEnd.Entity;

import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.Table;
import java.util.List;

@Entity
@Getter @Setter
@Table(name = "usuarios")
public class EUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;
    
    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL)
    private List<EProducto> productos;
    private String nombre_usuario;
    private String nombre_apellido;
    private String password;
    private String email;
    private String telefono;
    private String ubicacion; 

}
