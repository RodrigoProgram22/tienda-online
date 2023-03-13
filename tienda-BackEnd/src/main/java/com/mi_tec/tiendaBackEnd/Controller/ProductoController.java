package com.mi_tec.tiendaBackEnd.Controller;

import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import com.mi_tec.tiendaBackEnd.InterfaceS.IProductoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class ProductoController {
    @Autowired
    IProductoService iProducS;
    
    @GetMapping("/productos")
    public List<EProducto> verProductos() {
        return iProducS.obtenerTodosProductos();
    }  
    @GetMapping("/producto/buscar/{id}")
    public EProducto buscarProduc(@PathVariable Long id) {
        return iProducS.obtenerProductoPorId(id);
    }
    @GetMapping("/producto/buscarNombre/{nombre}")
    public List<EProducto> obtenerProductosPorNombre(@PathVariable String nombre) {
        return iProducS.obtenerProductosPorNombre(nombre);
    }
    @PostMapping("/producto/crear")
    public String crearProduc(@RequestBody EProducto produc) {
        iProducS.crearProducto(produc);
        return "Productos, se creo correctamente.";
    }
    @PutMapping("/producto/editar/{id}")
    public EProducto actualizarProducto(@PathVariable Long id, @RequestBody EProducto productoActualizado) {
    EProducto producto = iProducS.obtenerProductoPorId(id);
    
    producto.setNombre(productoActualizado.getNombre());
    producto.setEtiquetas(productoActualizado.getEtiquetas());
    producto.setDescripcion(productoActualizado.getDescripcion());
    producto.setPrecio(productoActualizado.getPrecio());
    producto.setPrecio(productoActualizado.getPrecio());
    producto.setCantidad(productoActualizado.getCantidad());
    
    return iProducS.crearProducto(producto);
    }

    @DeleteMapping("/producto/borrar/{id}")
    public String borrarUser(@PathVariable Long id) {
        iProducS.obtenerProductoPorId(id);
        return "Producto, Se elimino correctamente";
    }
}
