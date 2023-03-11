package com.mi_tec.tiendaBackEnd.Repository;

import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IProducto extends JpaRepository<EProducto, Long> {
    
    public List<EProducto> findByNombreContainingIgnoreCase(String nombre);
    
    public Optional<EProducto> findById(Long id);
    
    public void deleteById(Long id);
}
