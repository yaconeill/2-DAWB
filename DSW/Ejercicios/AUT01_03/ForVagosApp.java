/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm;

import java.io.IOException;
import java.util.Scanner;
import java.util.List;

/**
 * @author Yaco
 */
public class ForVagosApp {

    static List<Hotel> hotelList;
    public static Scanner sc = new Scanner(System.in);

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException {
        mostrarMenu();
    }

    private static void mostrarMenu() throws IOException {
        StringBuffer menu = new StringBuffer();
        menu.append("\n=============== FOR VAGOS ===================\n");
        menu.append("-- Échese una siestita mientras nosotros buscamos\n\n");
        menu.append("1. Busque por localidad\n");
        menu.append("2. Listar hoteles\n");
        menu.append("0. Salir\n");
        menu.append("-----------------------\n");
        menu.append("9. Admin\n");
        //menu.append("introduzca opción: ");

        // -------------- Menú administrador -----------
        StringBuffer menuAdmin = new StringBuffer();
        menuAdmin.append("\n=============== FOR VAGOS ===================\n\n");
        menuAdmin.append("1. Añadir hotel\n");
        menuAdmin.append("2. Borrar hotel\n");
        menuAdmin.append("0. Salir\n");
        //menuAdmin.append("introduzca opción: ");
        // -------------- Menú administrador -----------

        int opcion;
        int opcion2;
        do {
            System.out.print(menu);
            opcion = validaEntero("introduzca opción: ");

            switch (opcion) {
                case 1:
                    buscarHoteles();
                    break;
                case 2:
                    listarHoteles();
                    break;
                case 9:
                    do {
                        System.out.print(menuAdmin);
                        opcion2 = validaEntero("introduzca opción: ");
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
    }

    private static void insertarHotal() {
        Hotel newHotel = new Hotel();
        String nombre, localidad;
        Integer estrella, precio;
        System.out.print("\nInsertar el nombre del hotel: ");
        nombre = sc.nextLine().toUpperCase();
        System.out.print("Insertar la localidad: ");
        localidad = sc.nextLine().toUpperCase();
        estrella = validaEntero("Insertar el nº de estrellas: ");
        precio = validaEntero("Insertar precio por noche: ");
        newHotel.setNombre(nombre);
        newHotel.setLocalidad(localidad);
        newHotel.setEstrellas(estrella);
        newHotel.setPrecioNoche(precio);
        FilePersistence.save(newHotel);
    }

    private static void borrarHotel() throws IOException {
        System.out.print("\nInsertar el nombre del hotel: ");
        String busca = sc.nextLine();
        FilePersistence.delete(busca);
    }

    public static void listarHoteles() throws IOException {
        FilePersistence archivo = new FilePersistence();
        hotelList = archivo.list();
        for (int i = 0; i < hotelList.size(); i++) {
            {
                System.out.println(hotelList.get(i).toString());
            }
        }
    }

    private static void buscarHoteles() throws IOException {
        System.out.print("Introducir una localización: ");
        String busca = new Scanner(System.in).nextLine();
        boolean c = false;
        hotelList = FilePersistence.list();
        for (int i = 0; i < hotelList.size(); i++) {
            if (hotelList.get(i).getLocalidad().equalsIgnoreCase(busca)) {
                System.out.println(hotelList.get(i).toString());
                c = true;
            }
        }
        if (!c) {
            System.out.println("\nLo sentimos, no hay hoteles disponibles en esa zona.");
        }
    }

    public static int validaEntero(String texto) {
        int n;
        String mensaje = "Error: solo se aceptan numeros positivos.";
        System.out.print(texto);
        while (true) { // This is often frowned upon?

            // Check that input is integer
            while (!sc.hasNextInt()) {
                System.out.print(mensaje + "\n" + texto); // Gets repeated
                sc.next();
            }
            n = sc.nextInt();
            sc.nextLine();
            // Check that input is positive
            if (n >= 0) {
                return n;
            } else {
                System.out.print(mensaje + "\n" + texto);
            }
        }
    }
}
