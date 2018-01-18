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
public class Municipios implements Serializable{
    private Short idMunicipio;
    private Short idProvincia;
    private int codMunicipio;
    private int Dc;
    private String nombre;

    public Municipios() {
    }

    public Municipios(Short idMunicipio, Short idProvincia, int codMunicipio, int Dc, String nombre) {
        this.idMunicipio = idMunicipio;
        this.idProvincia = idProvincia;
        this.codMunicipio = codMunicipio;
        this.Dc = Dc;
        this.nombre = nombre;
    }

    public Short getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(Short idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    public Short getIdProvincia() {
        return idProvincia;
    }

    public void setIdProvincia(Short idProvincia) {
        this.idProvincia = idProvincia;
    }

    public int getCodMunicipio() {
        return codMunicipio;
    }

    public void setCodMunicipio(int codMunicipio) {
        this.codMunicipio = codMunicipio;
    }

    public int getDc() {
        return Dc;
    }

    public void setDc(int Dc) {
        this.Dc = Dc;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
