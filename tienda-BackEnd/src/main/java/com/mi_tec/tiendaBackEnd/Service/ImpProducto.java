package com.mi_tec.tiendaBackEnd.Service;

import com.mi_tec.tiendaBackEnd.Entity.EProducto;
import com.mi_tec.tiendaBackEnd.InterfaceS.IProductoService;
import com.mi_tec.tiendaBackEnd.Repository.IProducto;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImpProducto implements IProductoService {

    @Autowired
    private IProducto productoRepo;

    @Override
    public List<EProducto> obtenerTodosProductos() {
        return productoRepo.findAll();
    }

    @Override
    public Optional<EProducto> obtenerProductoPorId(Long id) {
        return productoRepo.findById(id);
    }

    @Override
    public List<EProducto> obtenerProductosPorNombre(String nombre) {
        return productoRepo.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public EProducto crearProducto(EProducto producto) {
        return productoRepo.save(producto);
    }

    @Override
    public EProducto actualizarProducto(Long id, EProducto producto) {
        Optional<EProducto> optionalProducto = productoRepo.findById(id);
        if (optionalProducto.isPresent()) {
            EProducto productoActualizado = optionalProducto.get(); 
            productoActualizado.setNombre(producto.getNombre());
            productoActualizado.setEtiquetas(producto.getEtiquetas());
            productoActualizado.setDescripcion(producto.getDescripcion());
            productoActualizado.setPrecio(producto.getPrecio());
            productoActualizado.setImagen(producto.getImagen());
            return productoRepo.save(productoActualizado);
        } else {
            throw new NoSuchElementException("No se encontró el producto con el id " + id);
        }
    }

    @Override
    public void eliminarProducto(Long id) {
        Optional<EProducto> optionalProducto = productoRepo.findById(id);
        if (optionalProducto.isPresent()) {
            productoRepo.delete(optionalProducto.get());
        } else {
            throw new NoSuchElementException("No se encontró el producto con el id " + id);
        }
    }
}
