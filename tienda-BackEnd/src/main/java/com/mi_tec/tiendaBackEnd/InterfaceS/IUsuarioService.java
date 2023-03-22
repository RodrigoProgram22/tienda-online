package com.mi_tec.tiendaBackEnd.InterfaceS;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import java.util.List;
import java.util.Optional;

public interface IUsuarioService {

    public List<EUsuario> obtenerUsuarios();

    public EUsuario obtenerUsuarioPorId(Long id);

    public EUsuario guardarUsuario(EUsuario usuario);

    public void eliminarUsuario(Long id);

    public Optional<EUsuario> getByNombreUsuario(String nombreUsuario);

    public boolean existsByNombreUsuario(String nombreUsuario);

    public boolean existsByEmail(String email);
}
