/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.search;

import es.cifpcm.forvago_yaco.web.common.MasterDataBean;
import es.cifpcm.forvago_yaco.web.model.Municipios;
import es.cifpcm.forvago_yaco.web.model.Provincias;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;

/**
 *
 * @author Yaco
 */
@Named(value = "hotelSearchBean")
@ApplicationScoped
public class HotelSearchBean {

    /**
     * Creates a new instance of HotelSearchBean
     */
    private Short idProvincia;
    private Short idMunicipio;
    private List<Municipios> allMunicipios;

    public List<Municipios> getAllMunicipios() {
        return allMunicipios;
    }

    public void setAllMunicipios(List<Municipios> allMunicipios) {
        this.allMunicipios = allMunicipios;
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

    public HotelSearchBean() {
        allMunicipios = new ArrayList<>();
        MasterDataBean bean = new MasterDataBean();
        allMunicipios = bean.getMunicipios();
    }

    public List<Provincias> getProvincias() {
        MasterDataBean bean = new MasterDataBean();
        return bean.getProvincias();
    }

    public List<Municipios> getMunicipios() {
        return allMunicipios;
    }
    
    public void onMunicipiosChange() {
        HotelResultsBean resultBean = new HotelResultsBean();
        resultBean.getIdMunicipio();
    }

    public void onCboProvinciasChange() {
        List<Municipios> filterMunicipios;
        filterMunicipios = new ArrayList<>();

        if (idProvincia != null) {
            
            for (Municipios municipio : allMunicipios) {
                if (Objects.equals(municipio.getIdProvincia(), idProvincia)) {
                    filterMunicipios.add(municipio);
                }
            }
            allMunicipios = filterMunicipios;
        }
    }
}
