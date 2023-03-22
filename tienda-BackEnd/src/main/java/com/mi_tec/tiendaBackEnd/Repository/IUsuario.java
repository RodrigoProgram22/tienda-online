package com.mi_tec.tiendaBackEnd.Repository;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUsuario extends JpaRepository<EUsuario, Long> {

    Optional<EUsuario> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<EUsuario> findByNombreUsuario(String nombreUsuario);

    boolean existsByNombreUsuario(String nombreUsuario);
}
