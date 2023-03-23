package com.mi_tec.tiendaBackEnd.InterfaceS;

import com.mi_tec.tiendaBackEnd.Entity.ECarrito;
import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import com.mi_tec.tiendaBackEnd.Entity.EUsuario;
import java.util.List;

public interface ICarritoService {
    public void crearCarrito(EUsuario usuario);
    
    public void agregarProducto(Long idCarrito, Long idProducto);
    
    public void eliminarProducto(Long idCarrito,Long idProducto);
    
    public List<EProducto> getProductos(Long idCarrito);
    
    public ECarrito getCarritoByUsuario(Long idUsuario);
}