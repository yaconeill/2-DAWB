/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

/**
 *
 * @author Yaco
 */
public class ShoppingCart implements Serializable {

    private final List<HotelOffer> offers = new ArrayList<>();

    public ShoppingCart() {
    }

    public void addOffer(HotelOffer offer) {
        this.offers.add(offer);
    }

    public void removeOffer(HotelOffer offer) {
        this.offers.remove(offer);
    }

    public BigDecimal getTotal() {
        return this.offers.stream().map(o -> o.getPrice()).reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
