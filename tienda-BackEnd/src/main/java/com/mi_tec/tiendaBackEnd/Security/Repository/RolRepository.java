package com.mi_tec.tiendaBackEnd.Security.Repository;

import com.mi_tec.tiendaBackEnd.Security.Entity.Rol;
import com.mi_tec.tiendaBackEnd.Security.Enums.RolNombre;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RolRepository extends JpaRepository<Rol, Integer>{
    Optional<Rol> findByRolNombre(RolNombre rolNombre);
}
