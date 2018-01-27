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
import java.util.Date;
import java.util.List;
import java.util.Objects;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
    private List<Municipios> filterMunicipios;
    private Date fechaEntrada;
    private Date fechaSalida;
    private String values;

    public HotelSearchBean() {
        allMunicipios = new ArrayList<>();
        filterMunicipios = new ArrayList<>();

        MasterDataBean bean = new MasterDataBean();
        allMunicipios = bean.getMunicipios();
    }

    public String getValues() {
        return values;
    }

    public void setValues(String values) {
        this.values = values;
    }

    public Date getFechaEntrada() {
        return fechaEntrada;
    }

    public void setFechaEntrada(Date fechaEntrada) {
        this.fechaEntrada = fechaEntrada;
    }

    public Date getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(Date fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public Date getCurrentDate() {
        return new Date();
    }

    public List<Municipios> getAllMunicipios() {
        return allMunicipios;
    }

    public void setAllMunicipios(List<Municipios> allMunicipios) {
        this.allMunicipios = allMunicipios;
    }

    public Short getIdMunicipio() {
        return idMunicipio;
    }

    public List<Municipios> getFilterMunicipios() {
        return filterMunicipios;
    }

    public void setFilterMunicipios(List<Municipios> filterMunicipios) {
        this.filterMunicipios = filterMunicipios;
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

    public List<Provincias> getProvincias() {
        MasterDataBean bean = new MasterDataBean();
        return bean.getProvincias();
    }

    public List<Municipios> getMunicipios() {
        if (idProvincia != null) {
            return filterMunicipios;
        } else {
            return allMunicipios;
        }
    }

    public void onMunicipiosChange() {
        HotelResultsBean resultBean = new HotelResultsBean();
        resultBean.getIdMunicipio();
    }

    public void onCboProvinciasChange() {
        List<Municipios> filtertmp;
        filtertmp = new ArrayList<>();

        if (idProvincia != null) {

            for (Municipios municipio : allMunicipios) {
                if (Objects.equals(municipio.getIdProvincia(), idProvincia)) {
                    filtertmp.add(municipio);
                }
            }
            filterMunicipios = filtertmp;
        }
    }

    public String sendData() {
        int days = (int) ((fechaSalida.getTime() - fechaEntrada.getTime()) / 86400000);
        setCookie("days", Integer.toString(days), 3600);
        return "searchResults?faces-redirect=true";
    }

    public void setCookie(String name, String value, int expiry) {

        FacesContext facesContext = FacesContext.getCurrentInstance();

        HttpServletRequest request = (HttpServletRequest) facesContext.getExternalContext().getRequest();
        Cookie cookie = null;

        Cookie[] userCookies = request.getCookies();
        if (userCookies != null && userCookies.length > 0) {
            for (int i = 0; i < userCookies.length; i++) {
                if (userCookies[i].getName().equals(name)) {
                    cookie = userCookies[i];
                    break;
                }
            }
        }
        if (cookie != null) {
            cookie.setValue(value);
        } else {
            cookie = new Cookie(name, value);
            cookie.setPath(request.getContextPath());
        }
        cookie.setMaxAge(expiry);
        HttpServletResponse response = (HttpServletResponse) facesContext.getExternalContext().getResponse();
        response.addCookie(cookie);
    }
}