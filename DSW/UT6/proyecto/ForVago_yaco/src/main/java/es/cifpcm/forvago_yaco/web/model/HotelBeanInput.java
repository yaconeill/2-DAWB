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
public class HotelBeanInput implements Serializable{
    private Short idMunicipio;
    private Short idProvincia;

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
}
