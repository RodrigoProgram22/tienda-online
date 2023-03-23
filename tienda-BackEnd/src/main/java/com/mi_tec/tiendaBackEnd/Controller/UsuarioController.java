package com.mi_tec.tiendaBackEnd.Controller;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import com.mi_tec.tiendaBackEnd.InterfaceS.IUsuarioService;
import com.mi_tec.tiendaBackEnd.Service.ImpCarrito;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {
   
    @Autowired
    IUsuarioService iUserS;
    
    @PreAuthorize("hasAnyRole('ADMIN')")
    @GetMapping("/usuarios")
    public List<EUsuario> verUsuarios() {
        return iUserS.obtenerUsuarios();
    }
    @PreAuthorize("hasAnyRole('USER')")
    @GetMapping("/usuario/buscar/{id}")
    public EUsuario buscarUser(@PathVariable Long id) {
        return iUserS.obtenerUsuarioPorId(id);
    }
      @PreAuthorize("hasAnyRole('USER')")
    @DeleteMapping("/usuario/borrar/{id}")
    public String borrarUser(@PathVariable Long id) {
        iUserS.eliminarUsuario(id);
        return "Usuario, Se elimino correctamente";
    }
}