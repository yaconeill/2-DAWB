/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package personaapp;

/**
 * @author Yaco
 */
public class Persona {

    public String nombre;
    public String apellidos;
    public int edad;

    public Persona(String nom, String apell, int edad) {
        this.nombre = nom;
        this.apellidos = apell;
        this.edad = edad;
    }

    public String getNombre() {
        return nombre;
    }

    public String getApellido() {
        return apellidos;
    }

    public Integer getEdad() {
        return edad;
    }

    public void setNombre(String newNombre) {
        this.nombre = newNombre;
    }

    public void setApellido(String newApellido) {
        this.apellidos = newApellido;
    }

    public void setEdad(int newEdad) {
        this.edad = newEdad;
    }

    @Override
    public String toString(){
        return "";
    }
}
