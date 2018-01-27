/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.model;

import java.io.Serializable;

/**
 *
 * @author Yaco
 */
public class Provincias implements Serializable{

    private Short idProvincia;
    private String nombre;

    public Provincias() {
    }

    public Provincias(Short idProvincia, String nombre) {
        this.idProvincia = idProvincia;
        this.nombre = nombre;
    }

    public Short getIdProvincia() {
        return idProvincia;
    }

    public void setIdProvincia(Short idProvincia) {
        this.idProvincia = idProvincia;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    
}
