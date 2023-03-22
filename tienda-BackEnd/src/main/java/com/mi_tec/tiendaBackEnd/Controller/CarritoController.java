package com.mi_tec.tiendaBackEnd.Controller;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import com.mi_tec.tiendaBackEnd.InterfaceS.ICarritoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/carrito")
public class CarritoController {
    
    @Autowired
    private ICarritoService carritoService;
    
    // Endpoint para agregar un producto al carrito
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @PostMapping("/{idCarrito}/productos/{idProducto}")
    public ResponseEntity<?> agregarProducto(@PathVariable Long idCarrito, @PathVariable Long idProducto) {
        try {
            carritoService.agregarProducto(idCarrito, idProducto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al agregar producto al carrito");
        }
    }
    
    // Endpoint para eliminar un producto del carrito
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @DeleteMapping("/{idCarrito}/productos/{idProducto}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long idCarrito, @PathVariable Long idProducto) {
        try {
            carritoService.eliminarProducto(idCarrito, idProducto);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar producto del carrito");
        }
    }
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/usuario/productos/{idUsuario}")
    public ResponseEntity<List<EProducto>> getProductosDelCarritoByUsuario(@PathVariable Long idUsuario) {
        ECarrito carrito = carritoService.getCarritoByUsuario(idUsuario);
        List<EProducto> productos = carritoService.getProductos(carrito.getId_carrito());
        return ResponseEntity.ok(productos);
    }
}
