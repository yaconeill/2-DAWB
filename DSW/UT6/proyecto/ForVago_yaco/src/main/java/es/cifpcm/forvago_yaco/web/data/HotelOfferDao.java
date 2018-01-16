/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.data;

import es.cifpcm.forvago_yaco.web.model.HotelOffer;
import java.util.List;

/**
 *
 * @author Yaco
 */
public interface HotelOfferDao {
    public List<HotelOffer> selectAll();

    public List<HotelOffer> selectByCriteria(Integer entero);

    public HotelOffer insert();

    public HotelOffer update();

    public HotelOffer delete();
}
