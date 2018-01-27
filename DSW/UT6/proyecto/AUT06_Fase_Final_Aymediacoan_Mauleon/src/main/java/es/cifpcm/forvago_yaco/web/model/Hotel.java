/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.model;

/**
 *
 * @author Yaco
 */
public class Hotel {

    private Short idHotel;    
    private String hotel;
    private Integer rating;
    private Integer rooms;
    private Short idProvincia;
    private Short IdMunicipio;
    private Integer postalCode;
    private String address;
    private String phone;
    private String fax;
    private String services;
    private String hotelPicture;

    public Hotel() {
    }

    public Hotel(String hotel, Integer rating, Integer rooms, Short idProvincia, Short IdMunicipio, Integer postalCode, String address, String phone, String fax, String services, String hotelPicture) {
        this.hotel = hotel;
        this.rating = rating;
        this.rooms = rooms;
        this.idProvincia = idProvincia;
        this.IdMunicipio = IdMunicipio;
        this.postalCode = postalCode;
        this.address = address;
        this.phone = phone;
        this.fax = fax;
        this.services = services;
        this.hotelPicture = hotelPicture;
    }

    public Short getIdHotel() {
        return idHotel;
    }

    public void setIdHotel(Short idHotel) {
        this.idHotel = idHotel;
    }

    public String getHotel() {
        return hotel;
    }

    public void setHotel(String hotel) {
        this.hotel = hotel;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getRooms() {
        return rooms;
    }

    public void setRooms(Integer rooms) {
        this.rooms = rooms;
    }

    public Short getIdProvincia() {
        return idProvincia;
    }

    public void setIdProvincia(Short idProvincia) {
        this.idProvincia = idProvincia;
    }

    public Short getIdMunicipio() {
        return IdMunicipio;
    }

    public void setIdMunicipio(Short IdMunicipio) {
        this.IdMunicipio = IdMunicipio;
    }

    public Integer getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(Integer postalCode) {
        this.postalCode = postalCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String addresss) {
        this.address = addresss;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getServices() {
        return services;
    }

    public void setServices(String services) {
        this.services = services;
    }

    public String getHotelPicture() {
        return hotelPicture;
    }

    public void setHotelPicture(String hotelPicture) {
        this.hotelPicture = hotelPicture;
    }

}
