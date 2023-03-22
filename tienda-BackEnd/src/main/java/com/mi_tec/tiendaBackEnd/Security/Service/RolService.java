
package com.mi_tec.tiendaBackEnd.Security.Service;

import com.mi_tec.tiendaBackEnd.Security.Entity.Rol;
import com.mi_tec.tiendaBackEnd.Security.Enums.RolNombre;
import com.mi_tec.tiendaBackEnd.Security.Repository.RolRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RolService {
    @Autowired
    RolRepository rolRepository;

    public Optional<Rol> getByRolNombre(RolNombre rolNombre){
        return rolRepository.findByRolNombre(rolNombre);
    }
    public void save(Rol rol){
        rolRepository.save(rol);
    }
}