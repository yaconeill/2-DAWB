/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;
import javax.faces.context.FacesContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Yaco
 */
public class ShoppingCart implements Serializable {

    private final List<HotelOffer> offers = new ArrayList<>();

    public List<HotelOffer> getOffers() {
        return offers;
    }

    public ShoppingCart() {
    }

    public void addOffer(HotelOffer offer) {
        int days = Integer.parseInt(getCookie("days").getValue());
        BigDecimal price = offer.getPrice();
        BigDecimal total = calculateCost(days, price);
        offer.setPrice(total);
        this.offers.add(offer);
    }

    public void removeOffer(HotelOffer offer) {
        this.offers.remove(offer);
    }

    public BigDecimal getTotal() {
        return this.offers.stream().map(o -> o.getPrice()).reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calculateCost(int quantity, BigDecimal hotelPrice) {
        BigDecimal totalCost = BigDecimal.ZERO;
        BigDecimal hotelCost  = BigDecimal.ZERO;
        hotelCost = hotelPrice.multiply(new BigDecimal(quantity));
        return totalCost.add(hotelCost);
    }
    
    public Cookie getCookie(String name) {

        FacesContext facesContext = FacesContext.getCurrentInstance();

        HttpServletRequest request = (HttpServletRequest) facesContext.getExternalContext().getRequest();
        Cookie cookie = null;

        Cookie[] userCookies = request.getCookies();
        if (userCookies != null && userCookies.length > 0) {
            for (int i = 0; i < userCookies.length; i++) {
                if (userCookies[i].getName().equals(name)) {
                    cookie = userCookies[i];
                    return cookie;
                }
            }
        }
        return null;
    }
}
