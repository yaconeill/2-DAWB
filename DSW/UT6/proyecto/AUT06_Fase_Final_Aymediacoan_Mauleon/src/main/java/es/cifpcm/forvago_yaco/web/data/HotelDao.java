/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.data;

import es.cifpcm.forvago_yaco.web.model.Hotel;

/**
 *
 * @author Yaco
 */
public interface HotelDao {
    public Hotel insert(Hotel customer);

    public Hotel update(Hotel customer);

    public Hotel delete(Hotel customer);
}
