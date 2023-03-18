package com.mi_tec.tiendaBackEnd.Service;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import com.mi_tec.tiendaBackEnd.InterfaceS.ICarritoService;
import com.mi_tec.tiendaBackEnd.Repository.ICarrito;
import com.mi_tec.tiendaBackEnd.Repository.IProducto;
import com.mi_tec.tiendaBackEnd.Repository.IUsuario;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpCarrito implements ICarritoService{
    
    @Autowired
    private ICarrito carritoRepository;
    
    @Autowired
    private IProducto productoRepository;
    
    @Autowired
    private IUsuario usuarioRepository;
    
    @Override
    public void crearCarrito(EUsuario usuario) {
        ECarrito carrito = new ECarrito();
        carrito.setUsuario(usuario);
        carritoRepository.save(carrito);
    }
    
    // Método para agregar un producto al carrito
    @Override
    public void agregarProducto(Long idCarrito, Long idProducto) {
        ECarrito carrito = carritoRepository.findById(idCarrito).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        EProducto producto = productoRepository.findById(idProducto).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        carrito.agregarProducto(producto);
        carritoRepository.save(carrito);
    }
    
    // Método para eliminar un producto del carrito
    @Override
    public void eliminarProducto(Long idCarrito, Long idProducto) {
        ECarrito carrito = carritoRepository.findById(idCarrito).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        EProducto producto = productoRepository.findById(idProducto).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
        
        carrito.eliminarProducto(producto);
        carritoRepository.save(carrito);
    }
    
    // Método para obtener los productos del carrito
    @Override
    public List<EProducto> getProductos(Long idCarrito) {
        ECarrito carrito = carritoRepository.findById(idCarrito).orElseThrow(() -> new RuntimeException("Carrito no encontrado"));
        return carrito.getProductos();
    }
    
    // Método para obtener el carrito de un usuario
    @Override
    public ECarrito getCarritoByUsuario(Long idUsuario) {
        EUsuario usuario = usuarioRepository.findById(idUsuario).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return usuario.getCarrito();
    }
}
