/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm;

import java.awt.*;
import java.util.Scanner;

/**
 * @author Yaco
 */
public class ForVagosApp {
    static List hotelList = new List();
    static Hotel acceso = new Hotel();

//    Hotel hotel = new Hotel("Atlantico", "Santa Cruz", 5, 200);

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        mostrarMenu();
//        mostrar();
    }

    private static void mostrarMenu() {
        Scanner sc = new Scanner(System.in);
        StringBuffer menu = new StringBuffer();
        menu.append("\n=============== FOR VAGOS ===================\n");
        menu.append("-- Échese una siestita mientras nosotros buscamos\n\n");
        menu.append("1. Busque por localidad\n");
        menu.append("0. Salir\n");
        menu.append("-----------------------\n");
        menu.append("9. Admin\n");
        menu.append("introduzca opción: ");

        // -------------- Menú administrador -----------
        StringBuffer menuAdmin = new StringBuffer();
        menuAdmin.append("\n=============== FOR VAGOS ===================\n\n");
        menuAdmin.append("1. Añadir hotel\n");
        menuAdmin.append("2. Borrar hotel\n");
        menuAdmin.append("0. Salir\n");
        menuAdmin.append("introduzca opción: ");
        // -------------- Menú administrador -----------

        int opcion;
        int opcion2;
        do {
            System.out.print(menu);
            opcion = sc.nextInt();

            switch (opcion) {
                case 1:
                    buscarHoteles();

                    break;
                case 9:
                    do {
                        System.out.print(menuAdmin);
                        opcion2 = sc.nextInt();
                        switch (opcion2) {
                            case 1:
                                insertarHotal();
                                break;
                            case 2:
                                borrarHotel();
                                break;
                        }
                    } while (opcion2 != 0);
            }
        } while (opcion != 0);
        System.out.close();
    }

    private static void mostrar() {

    }

    private static void insertarHotal() {
        Scanner sc = new Scanner(System.in);
        String nombre, localidad;
        Integer estrella, precio;
        System.out.print("\nInsertar el nombre del hotel: ");
        nombre = sc.nextLine();
        System.out.print("Insertar la localidad: ");
        localidad = sc.nextLine();
        System.out.print("Insertar el nº de estrellas: ");
        estrella = sc.nextInt();
        System.out.print("Insertar precio por noche: ");
        precio = sc.nextInt();
        acceso.setNombre(nombre);
        acceso.setLocalidad(localidad);
        acceso.setEstrellas(estrella);
        acceso.setPrecioNoche(precio);
    }

    private static void borrarHotel() {

    }

    public static void listarHoteles() {

    }

    private static void buscarHoteles() {
        mostrar();
    }
}
