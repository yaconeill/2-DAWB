/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm;

/**
 * @author Yaco
 */

public class Hotel {
    private String nombre;
    private String localidad;
    private Integer estrellas;
    private Integer precioNoche;

    public Hotel(String nombre, String localidad, int estrellas, int precioNoche) {
        this.nombre = nombre;
        this.localidad = localidad;
        this.estrellas = estrellas;
        this.precioNoche = precioNoche;
    }

    public Hotel() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public int getEstrellas() {
        return estrellas;
    }

    public void setEstrellas(int estrellas) {
        this.estrellas = estrellas;
    }

    public int getPrecioNoche() {
        return precioNoche;
    }

    public void setPrecioNoche(int precioNoche) {
        this.precioNoche = precioNoche;
    }

    @Override
    public String toString(){
        return ("\nHotel : " + nombre + "\nLocalidad: " + localidad
                + "\nEstrellas: " + estrellas + "\nPrecio noche: " + precioNoche + "\n");
    }
}
