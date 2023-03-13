package com.mi_tec.tiendaBackEnd.InterfaceS;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import java.util.List;

public interface IUsuarioService {
    
    public List<EUsuario> obtenerUsuarios();

    public EUsuario obtenerUsuarioPorId(Long id);

    public EUsuario guardarUsuario(EUsuario usuario);
    
    public boolean autenticar(String correo, String contrasena);
    
    public boolean verificarEmailDuplicado(String email);
    
    public void eliminarUsuario(Long id);
}
