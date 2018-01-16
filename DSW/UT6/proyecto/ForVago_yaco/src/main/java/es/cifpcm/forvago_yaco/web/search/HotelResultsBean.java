/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.search;

import es.cifpcm.forvago_yaco.web.data.HotelOfferDao;
import es.cifpcm.forvago_yaco.web.data.HotelOfferDaoImpl;
import es.cifpcm.forvago_yaco.web.model.HotelOffer;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Yaco
 */
@Named(value = "hotelResultsBean")
@SessionScoped
public class HotelResultsBean implements Serializable {

    private List<HotelOffer> offers = new ArrayList<>();    
    private List<HotelOffer> selectedOffer = new ArrayList<>();


    public List<HotelOffer> getOffers() {
        HotelOfferDao hoffer = new HotelOfferDaoImpl();
        offers = hoffer.selectAll();
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
        
    }

}
