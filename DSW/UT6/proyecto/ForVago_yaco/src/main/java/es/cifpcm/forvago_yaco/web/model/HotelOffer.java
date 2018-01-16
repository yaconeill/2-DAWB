/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.model;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 *
 * @author Yaco
 */
public class HotelOffer implements Serializable {

    private String hotel;
    private BigDecimal price;
    public String hotelPicture;

    public HotelOffer() {
    }

    public HotelOffer(String hotel, BigDecimal price, String hotelPicture) {
        this.hotel = hotel;
        this.price = price;
        this.hotelPicture = hotelPicture;
    }

    public String getHotel() {
        return hotel;
    }

    public void setHotel(String hotel) {
        this.hotel = hotel;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getHotelPicture() {
        return hotelPicture;
    }

    public void setHotelPicture(String hotelPicture) {
        this.hotelPicture = hotelPicture;
    }
    
}
