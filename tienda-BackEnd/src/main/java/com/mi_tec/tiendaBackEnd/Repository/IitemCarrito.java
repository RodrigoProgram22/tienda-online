package com.mi_tec.tiendaBackEnd.Repository;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EItemCarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IitemCarrito extends JpaRepository<EItemCarrito, Long> {
    //public List<EItemCarrito> findByCarritoUsuarioId(Long id_usuario);
    public void deleteByCarritoAndProducto(ECarrito carrito, EProducto producto);
    public List<EItemCarrito> findByCarrito(ECarrito carrito);
}