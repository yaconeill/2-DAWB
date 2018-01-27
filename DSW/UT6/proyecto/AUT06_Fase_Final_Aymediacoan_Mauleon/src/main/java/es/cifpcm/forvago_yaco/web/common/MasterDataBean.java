/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.common;

import es.cifpcm.forvago_yaco.web.data.MunicipiosDao;
import es.cifpcm.forvago_yaco.web.data.MunicipiosDaoImpl;
import es.cifpcm.forvago_yaco.web.data.ProvinciasDao;
import es.cifpcm.forvago_yaco.web.data.ProvinciasDaoImpl;
import es.cifpcm.forvago_yaco.web.model.Municipios;
import es.cifpcm.forvago_yaco.web.model.Provincias;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;

/**
 *
 * @author Yaco
 */
@Named(value = "masterDataBean")
@ApplicationScoped
public class MasterDataBean {

    /**
     * Creates a new instance of MasterDataBean
     */
    public MasterDataBean() {
    }
    
    public List<Provincias> getProvincias() {
        ProvinciasDao provinciasDao = new ProvinciasDaoImpl();
        return provinciasDao.selectAll();
    }
    public List<Municipios> getMunicipios() {
        MunicipiosDao municipiosDao = new MunicipiosDaoImpl();
        return municipiosDao.selectAll();
    }    
}
