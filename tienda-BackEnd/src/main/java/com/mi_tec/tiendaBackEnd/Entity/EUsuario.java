package com.mi_tec.tiendaBackEnd.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mi_tec.tiendaBackEnd.Security.Entity.Rol;
import java.util.HashSet;
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
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@Table(name = "usuarios")
public class EUsuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_usuario;

    @OneToMany(mappedBy = "proveedor", cascade = CascadeType.ALL)
    private List<EProducto> productos;
    @NotNull
    @Column(unique = true)
    private String nombreUsuario;
    private String nombreApellido;
    private String password;
    private String email;
    private String telefono;
    private String ubicacion;

    // Nueva relación uno a uno con la entidad ECarrito
    @OneToOne(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private ECarrito carrito;

    @NotNull
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "usuario_rol", joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "rol_id"))
    private Set<Rol> roles = new HashSet<>();

    // Constructor
    public EUsuario() {}
    public EUsuario(String nombre,String nombre_User,String pass,String email,String telefono,String ubi){
        this.nombreApellido = nombre;
        this.nombreUsuario = nombre_User;
        this.password = pass;
        this.email = email;
        this.telefono = telefono;
        this.ubicacion = ubi;
    }
}
