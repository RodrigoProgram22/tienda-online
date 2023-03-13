package com.mi_tec.tiendaBackEnd.Service;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EItemCarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import com.mi_tec.tiendaBackEnd.InterfaceS.IitemService;
import com.mi_tec.tiendaBackEnd.Repository.IitemCarrito;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class ImpItemCarrito implements IitemService {
    
    @Autowired
    IitemCarrito itemCarritoRepo;

    @Override
    public void agregarProductoAlCarrito(ECarrito carrito, EProducto producto, Integer cantidad) {
        EItemCarrito itemCarrito = new EItemCarrito();
        itemCarrito.setCarrito(carrito);
        itemCarrito.setProducto(producto);
        itemCarrito.setCantidad(cantidad);
        itemCarritoRepo.save(itemCarrito);
    }

    @Override
    public void actualizarCantidadDeProductoEnCarrito(ECarrito carrito, EProducto producto, Integer cantidad) {
        List<EItemCarrito> itemsCarrito = itemCarritoRepo.findByCarrito(carrito);
        for (EItemCarrito itemCarrito : itemsCarrito) {
            if (itemCarrito.getProducto().equals(producto)) {
                itemCarrito.setCantidad(cantidad);
                itemCarritoRepo.save(itemCarrito);
                return;
            }
        }
    }

    @Override
    public void eliminarProductoDelCarrito(ECarrito carrito, EProducto producto) {
        itemCarritoRepo.deleteByCarritoAndProducto(carrito, producto);
    }
}