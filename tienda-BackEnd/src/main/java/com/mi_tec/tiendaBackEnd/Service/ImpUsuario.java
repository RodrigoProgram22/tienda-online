package com.mi_tec.tiendaBackEnd.Service;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import com.mi_tec.tiendaBackEnd.InterfaceS.IUsuarioService;
import com.mi_tec.tiendaBackEnd.Repository.IUsuario;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpUsuario implements IUsuarioService {
    
    @Autowired
    IUsuario UsuarioRepo;
  
    @Override
    public List<EUsuario> obtenerUsuarios() {
       return UsuarioRepo.findAll();
    }
    
    @Override
    public EUsuario obtenerUsuarioPorId(Long id) {
        return UsuarioRepo.findById(id).orElse(null);
    }

    @Override
    public EUsuario guardarUsuario(EUsuario usuario) {
      return UsuarioRepo.save(usuario);
    }

    @Override
    public boolean autenticar(String correo, String contrasena) {
        Optional<EUsuario> usuario = UsuarioRepo.findByEmail(correo);
        return usuario.isPresent() && usuario.get().getPassword().equals(contrasena);
    }

    @Override
    public void eliminarUsuario(Long id) {
         UsuarioRepo.deleteById(id);
    }
}