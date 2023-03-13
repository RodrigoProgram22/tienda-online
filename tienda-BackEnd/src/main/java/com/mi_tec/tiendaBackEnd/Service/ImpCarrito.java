package com.mi_tec.tiendaBackEnd.Service;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EItemCarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import com.mi_tec.tiendaBackEnd.InterfaceS.ICarritoService;
import com.mi_tec.tiendaBackEnd.Repository.ICarrito;
import com.mi_tec.tiendaBackEnd.Repository.IUsuario;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ImpCarrito implements ICarritoService{
    @Autowired
    private ICarrito carritoRepo;
    @Autowired
    private IUsuario usuarioRepo;

    @Transactional
    @Override
    public void eliminarProductoDelCarrito(Long id_usuario, Long id_producto) {
        Optional<EUsuario> usuarioOptional = usuarioRepo.findById(id_usuario);
        if(usuarioOptional.isPresent()) {
            EUsuario usuario = usuarioOptional.get();
            List<EProducto> productos = usuario.getProductos();
            Optional<EProducto> productoOptional = productos.stream()
                .filter(producto -> producto.getId_producto().equals(id_producto))
                .findFirst();
            if(productoOptional.isPresent()) {
                EProducto producto = productoOptional.get();
                productos.remove(producto);
                usuario.setProductos(productos);
                usuarioRepo.save(usuario);
            }
        }
    }
    
    @Override
    public ECarrito obtenerCarritoPorId(Long id) {
        return carritoRepo.findById(id).orElse(null);
    }

    @Override
    public void agregarProductoAlCarrito(Long idCarrito, EProducto producto, Integer cantidad) {
     ECarrito carrito = obtenerCarritoPorId(idCarrito);
        List<EItemCarrito> items = carrito.getItems();
        for (EItemCarrito item : items) {
            if (item.getProducto().getId_producto().equals(producto.getId_producto())) {
                item.setCantidad(item.getCantidad() + cantidad);
                return;
            }
        } 
        EItemCarrito nuevoItem = new EItemCarrito(carrito,producto, cantidad);
        nuevoItem.setCarrito(carrito);
        items.add(nuevoItem);
    }
}
