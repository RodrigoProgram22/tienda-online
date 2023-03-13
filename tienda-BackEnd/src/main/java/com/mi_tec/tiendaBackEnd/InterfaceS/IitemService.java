package com.mi_tec.tiendaBackEnd.InterfaceS;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;

public interface IitemService {
    public void agregarProductoAlCarrito(ECarrito carrito, EProducto producto, Integer cantidad);
    public void actualizarCantidadDeProductoEnCarrito(ECarrito carrito, EProducto producto, Integer cantidad);
    public void eliminarProductoDelCarrito(ECarrito carrito, EProducto producto);
}

