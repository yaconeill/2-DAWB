package es.cifpcm.consumoelectrico_Aymediacoan.buscador.web;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author Yaco
 */
public class Cliente {

    private Integer clNo;
    private String firstName;
    private String lastName;
    private String streetName;    
    private String number;
    private Integer postalCode;
    private String population;
    private String province;

    public Cliente(Integer clNo, String firstName, String lastName, String streetName, String number, Integer postalCode, String population, String province) {
        this.clNo = clNo;
        this.firstName = firstName;
        this.lastName = lastName;
        this.streetName = streetName;
        this.number = number;
        this.postalCode = postalCode;
        this.population = population;
        this.province = province;
    }

    public Cliente() {
    }

    public Integer getClNo() {
        return clNo;
    }

    public void setClNo(Integer clNo) {
        this.clNo = clNo;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(Integer postalCode) {
        this.postalCode = postalCode;
    }

    public String getPopulation() {
        return population;
    }

    public void setPopulation(String population) {
        this.population = population;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }
    
    
}
