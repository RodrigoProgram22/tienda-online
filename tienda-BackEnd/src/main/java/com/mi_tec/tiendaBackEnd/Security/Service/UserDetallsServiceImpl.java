package com.mi_tec.tiendaBackEnd.Security.Service;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import com.mi_tec.tiendaBackEnd.Security.Entity.UsuarioPrincipal;
import com.mi_tec.tiendaBackEnd.Service.ImpUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetallsServiceImpl implements UserDetailsService{

    @Autowired ImpUsuario usuarioService;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EUsuario usuario = usuarioService.getByNombreUsuario(username).get();
        return UsuarioPrincipal.build(usuario);
    }
}
