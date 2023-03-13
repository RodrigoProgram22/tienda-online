package com.mi_tec.tiendaBackEnd.Controller;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import com.mi_tec.tiendaBackEnd.InterfaceS.IUsuarioService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin
public class UsuarioController {
   
    @Autowired
    IUsuarioService iUserS;
    
    @GetMapping("/usuarios")
    public List<EUsuario> verUsuarios() {
        return iUserS.obtenerUsuarios();
    }
    
    @PostMapping("/usuario/crear")
    public ResponseEntity<String> crearUsuario(@RequestBody EUsuario usuario) {
        if (iUserS.verificarEmailDuplicado(usuario.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El correo ya está en uso");
        }
        iUserS.guardarUsuario(usuario);
        return ResponseEntity.ok("Usuario creado correctamente");
    }
    @GetMapping("/usuario/buscar/{id}")
    public EUsuario buscarUser(@PathVariable Long id) {
        return iUserS.obtenerUsuarioPorId(id);
    }
    
    @PostMapping("/usuario/login")
    public ResponseEntity<String> iniciarSesion(@RequestBody EUsuario usuario) {
        boolean autenticado = iUserS.autenticar(usuario.getEmail(), usuario.getPassword());
        if (autenticado) {
           return ResponseEntity.ok("Usuario autenticado correctamente.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales incorrectas.");
       }
    }

    @DeleteMapping("/usuario/borrar/{id}")
    public String borrarUser(@PathVariable Long id) {
        iUserS.eliminarUsuario(id);
        return "Usuario, Se elimino correctamente";
    }
}
