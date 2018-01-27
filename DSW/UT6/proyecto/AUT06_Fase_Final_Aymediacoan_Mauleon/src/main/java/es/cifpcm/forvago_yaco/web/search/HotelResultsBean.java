/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.search;

import es.cifpcm.forvago_yaco.web.data.HotelOfferDao;
import es.cifpcm.forvago_yaco.web.data.HotelOfferDaoImpl;
import es.cifpcm.forvago_yaco.web.model.HotelOffer;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.inject.Named;

/**
 *
 * @author Yaco
 */
@Named(value = "hotelResultsBean")
@SessionScoped
public class HotelResultsBean implements Serializable {

    private List<HotelOffer> offers;
    private List<HotelOffer> selectedOffer;
    private Short idMunicipio;
    private Short days;

    public Short getDays() {
        return days;
    }

    public void setDays(Short days) {
        this.days = days;
    }

    public Short getIdMunicipio() {
        return idMunicipio;
    }

    public void setIdMunicipio(Short idMunicipio) {
        this.idMunicipio = idMunicipio;
    }

    public List<HotelOffer> getOffers(Short idMunicipio) {
        HotelOfferDao hoffer = new HotelOfferDaoImpl();

        this.idMunicipio = idMunicipio;
        if (this.idMunicipio != null) {
            this.offers = hoffer.selectByCriteria(this.idMunicipio);
        } else {
            this.offers = hoffer.selectAll();
        }
        return offers;
    }

    public void setOffers(List<HotelOffer> offers) {
        this.offers = offers;
    }

    public List<HotelOffer> getSelectedOffer() {
        return selectedOffer;
    }

    public void setSelectedOffer(List<HotelOffer> selectedOffer) {
        this.selectedOffer = selectedOffer;
    }

    /**
     * Creates a new instance of HotelResultsBean
     */
    public HotelResultsBean() {
        this.selectedOffer = new ArrayList<>();
        this.offers = new ArrayList<>();
    }
}
