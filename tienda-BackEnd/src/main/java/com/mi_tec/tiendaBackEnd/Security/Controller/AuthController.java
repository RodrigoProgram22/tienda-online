package com.mi_tec.tiendaBackEnd.Security.Controller;

import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import com.mi_tec.tiendaBackEnd.InterfaceS.IUsuarioService;
import com.mi_tec.tiendaBackEnd.Security.Dto.JwtDto;
import com.mi_tec.tiendaBackEnd.Security.Dto.LoginUsuario;
import com.mi_tec.tiendaBackEnd.Security.Dto.Mensaje;
import com.mi_tec.tiendaBackEnd.Security.Dto.NuevoUsuario;
import com.mi_tec.tiendaBackEnd.Security.Entity.Rol;
import com.mi_tec.tiendaBackEnd.Security.Enums.RolNombre;
import com.mi_tec.tiendaBackEnd.Security.Jwt.JwtProvider;
import com.mi_tec.tiendaBackEnd.Security.Service.RolService;
import com.mi_tec.tiendaBackEnd.Service.ImpCarrito;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
//@CrossOrigin
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IUsuarioService usuarioService;

    @Autowired
    RolService rolService;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    ImpCarrito carritoService;
    
    @GetMapping("/usuario")
    public ResponseEntity<?> obtenerUsuario() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        EUsuario usuario = usuarioService.buscarPorNombreUsuario(userDetails.getUsername());
        return new ResponseEntity(usuario, HttpStatus.OK);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<?> nuevo(@Valid @RequestBody NuevoUsuario nuevoUser, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity(new Mensaje("Campos vacios"), HttpStatus.BAD_REQUEST);
        }
        if (usuarioService.existsByNombreUsuario(nuevoUser.getNombreUsuario())) {
            return new ResponseEntity(new Mensaje("Ese nombre ya existe"), HttpStatus.BAD_REQUEST);
        }
        if (usuarioService.existsByEmail(nuevoUser.getEmail())) {
            return new ResponseEntity(new Mensaje("Ese email ya existe"), HttpStatus.BAD_REQUEST);
        }
        EUsuario usuario = new EUsuario(nuevoUser.getNombre(), nuevoUser.getNombreUsuario(),
                passwordEncoder.encode(nuevoUser.getPassword()), nuevoUser.getEmail(), nuevoUser.getTelefono(), nuevoUser.getUbicacion());
        Set<Rol> roles = new HashSet<>();
        Optional<Rol> optionalRol = rolService.getByRolNombre(RolNombre.ROLE_USER);
        if (optionalRol.isPresent()) {
            roles.add(optionalRol.get());
        }
        if (nuevoUser.getRoles().contains("admin")) {
            Optional<Rol> optionalRolAdmin = rolService.getByRolNombre(RolNombre.ROLE_ADMIN);
            if (optionalRolAdmin.isPresent()) {
                roles.add(optionalRolAdmin.get());
            }
        }
        usuario.setRoles(roles);
        usuarioService.guardarUsuario(usuario);
        EUsuario nuevoUsuario = usuarioService.guardarUsuario(usuario);
        carritoService.crearCarrito(nuevoUsuario); // Crear un carrito para el nuevo usuario
       
        return new ResponseEntity(new Mensaje("Usuario guardado"), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtDto> login(@Valid @RequestBody LoginUsuario loginUsuario, BindingResult b) {
        if (b.hasErrors()) {
            return new ResponseEntity(new Mensaje("Campos vacios. Rellena todos los campos."), HttpStatus.BAD_REQUEST);
        }
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginUsuario.getNombreUsuario(), loginUsuario.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
        return new ResponseEntity(jwtDto, HttpStatus.OK);
    }
}
