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
    public void eliminarUsuario(Long id) {
        UsuarioRepo.deleteById(id);
    }

    @Override
    public Optional<EUsuario> getByNombreUsuario(String nombreUsuario) {
        return UsuarioRepo.findByNombreUsuario(nombreUsuario);
    }

    @Override
    public boolean existsByNombreUsuario(String nombreUsuario) {
        return UsuarioRepo.existsByNombreUsuario(nombreUsuario);
    }

    public boolean existsByEmail(String email) {
        return UsuarioRepo.existsByEmail(email);
    }
    @Override
    public EUsuario buscarPorNombreUsuario(String nombreUsuario) {
        return UsuarioRepo.findByNombreUsuario(nombreUsuario).orElse(null);
    }
}
