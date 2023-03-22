package com.mi_tec.tiendaBackEnd.Security.Dto;
public class Mensaje {
    private String mensaje;
    
    public Mensaje(String mensaje){this.mensaje = mensaje;}
    
    public String getMensaje(){return mensaje;}
    
    public void setMensaje(String mensaje){this.mensaje = mensaje;} 
}
