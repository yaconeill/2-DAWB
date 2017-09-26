/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package personaapp;

import java.util.Scanner;

/**
 *
 * @author Yaco
 */
public class PersonaApp {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Persona p = new Persona();
        p.nombre = "Marta";
        p.apellidos = "Sanchez";
        p.edad = 42;
        Persona p2 = new Persona();
        p2.nombre = "Juan";
        p2.apellidos = "Diego";
        p2.edad = 39;
        System.out.print(p2.nombre + p2.apellidos + p2.edad);
        //p.nombre = sc.nextLine();
        //System.out.print();
        //p.apellidos = sc.nextLine();
        //System.out.print();
        //p.edad = sc.nextInt();
        //System.out.println();
    }

}
