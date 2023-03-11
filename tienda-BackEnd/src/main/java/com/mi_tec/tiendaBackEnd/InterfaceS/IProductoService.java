
package com.mi_tec.tiendaBackEnd.InterfaceS;

import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import java.util.List;
import java.util.Optional;

public interface IProductoService {
    
    public List<EProducto> obtenerTodosProductos();
    
    public Optional<EProducto> obtenerProductoPorId(Long id);
    
    public List<EProducto> obtenerProductosPorNombre(String nombre);
    
    public EProducto crearProducto(EProducto producto);
    
    public EProducto actualizarProducto(Long id, EProducto producto);
    
    public void eliminarProducto(Long id);   
}
