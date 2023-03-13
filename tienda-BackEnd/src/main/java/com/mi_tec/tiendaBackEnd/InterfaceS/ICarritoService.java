package com.mi_tec.tiendaBackEnd.InterfaceS;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;

public interface ICarritoService {
    public ECarrito obtenerCarritoPorId(Long id);
    public void agregarProductoAlCarrito(Long idCarrito, EProducto producto, Integer cantidad);
    public void eliminarProductoDelCarrito(Long idUsuario, Long idProducto);
}
