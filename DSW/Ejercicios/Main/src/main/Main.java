/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package main;

/**
 *
 * @author Yaco
 */
public class Main {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Persona p1 = new Persona();
        p1.nombre = "Marta";
        p1.apellidos = "Sánchez";
        p1.edad = 42;

        Persona p2 = new Persona();
        p2.nombre = "Juan";
        p2.apellidos = "Diego";
        p2.edad = 39;
        
        System.out.println(p1.nombre + " " + p1.apellidos + " " + p1.edad);        
        System.out.println(p2.nombre + " " + p2.apellidos + " " + p2.edad);

    }

}
