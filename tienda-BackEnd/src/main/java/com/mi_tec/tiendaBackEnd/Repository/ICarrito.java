package com.mi_tec.tiendaBackEnd.Repository;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICarrito extends JpaRepository<ECarrito, Long> {

}
