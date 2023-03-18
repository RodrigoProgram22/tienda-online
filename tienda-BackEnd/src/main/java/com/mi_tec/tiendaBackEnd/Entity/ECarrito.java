package com.mi_tec.tiendaBackEnd.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Getter @Setter
@Table(name = "carrito")
public class ECarrito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_carrito;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario")
    @JsonIgnore
    private EUsuario usuario;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "carrito_productos",
           joinColumns = @JoinColumn(name = "id_carrito"),
           inverseJoinColumns = @JoinColumn(name = "id_producto"))
    private List<EProducto> productos = new ArrayList<>();

    public void agregarProducto(EProducto producto) {
        this.productos.add(producto);
    }

    public void eliminarProducto(EProducto producto) {
        this.productos.remove(producto);
    }
    // Constructor vacío
    public ECarrito() {
    }
}