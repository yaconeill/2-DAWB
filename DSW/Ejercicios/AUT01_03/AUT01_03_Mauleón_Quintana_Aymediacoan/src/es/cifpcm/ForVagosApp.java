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
        // Llamada a la clase FilePersistance al m�todo open() que crea el fichero
        // si no est� ya creado, donde se guardan los datos.
        FilePersistence.open();
        mostrarMenu();
    }

    // M�todo que almacena los menus en variables de tipo Stingbuffer, adem�s de
    // gestionar el menu, tanto las opciones como las llamadas a las funciones.
    private static void mostrarMenu() throws IOException {
        // -------------- Men� Pincipal ------------------------
        StringBuffer menu = new StringBuffer();
        menu.append("\n=============== FOR VAGOS ===================\n");
        menu.append("-- �chese una siestita mientras nosotros buscamos\n\n");
        menu.append("1. Busque por localidad\n");
        menu.append("2. Listar hoteles\n");
        menu.append("0. Salir\n");
        menu.append("-----------------------\n");
        menu.append("9. Admin\n");
        // -------------- Fin del Men� Pincipal ----------------

        // -------------- Men� administrador -------------------
        StringBuffer menuAdmin = new StringBuffer();
        menuAdmin.append("\n=============== FOR VAGOS ===================\n\n");
        menuAdmin.append("1. A�adir hotel\n");
        menuAdmin.append("2. Borrar hotel\n");
        menuAdmin.append("0. Salir\n");
        // -------------- Fin del  Men� administrador -----------
        // Bucle que se repetir� hasta que se introduzca 0 para salir.
        int opcion;
        int opcion2;
        do {
            System.out.print(menu);
            opcion = validaEntero("\nintroduzca opci�n: ");

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
                        opcion2 = validaEntero("\nintroduzca opci�n: ");
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

    // M�todo que introduce los valores dados y validados, pasarlos por par�metro
    // al constructor y crear un nuevo objeto tipo hotel, para luego llamar a la
    // clase FilePersistance al m�todo save(), que guardar� el objeto en un fichero
    private static void insertarHotal() {
        String nombre, localidad;
        Integer estrella, precio;
        nombre = validaCadena("\nInsertar el nombre del hotel: ").toUpperCase();
        localidad = validaCadena("Insertar la localidad: ").toUpperCase();
        estrella = validaEntero("Insertar el n� de estrellas: ");
        precio = validaEntero("Insertar precio por noche: ");
        Hotel newHotel = new Hotel(nombre, localidad, estrella, precio);
        FilePersistence.save(newHotel);
    }

    // M�todo que pide introducir por teclado el nombre del hotel a borrar y lo
    // pasa como par�metro al m�todo delete() de la clase FilePersistence.
    private static void borrarHotel() throws IOException {
        String busca = validaCadena("\nInsertar el nombre del hotel: ");
        FilePersistence.delete(busca);
    }

    // M�todo que lista tolos lo registros disponible en el fichero, llama al m�todo
    // list(), que devolver� una lista que ser� almacenada en la lista de tipo 
    // Hotel hotelList y mediante un bucle se iran escribiendo en la consola.
    public static void listarHoteles() throws IOException {
        //FilePersistence archivo = new FilePersistence();
        hotelList = FilePersistence.list();
        for (int i = 0; i < hotelList.size(); i++) {
            {
                // Escribe los atributos de cada objeto y con toString se le dar� un formato legible.
                System.out.println(hotelList.get(i).toString());
            }
        }
    }

    // M�todo que pedir� una localizaci�n como par�metro de b�squeda de hoteles
    // para listar los que coincidan con la lista recibida desde la llamada a list()
    // de la clase FilePersistence.
    private static void buscarHoteles() throws IOException {
        String busca = validaCadena("Introducir una localizaci�n: ");
        boolean c = false;
        hotelList = FilePersistence.list();
        for (int i = 0; i < hotelList.size(); i++) {
            if (hotelList.get(i).getLocalidad().equalsIgnoreCase(busca)) {
                System.out.println(hotelList.get(i).toString());
                c = true;
            }
        }
        // En caso de no hayar coincidencia se mostra un mensaje informativo.
        if (!c) {
            System.out.println("\nLo sentimos, no hay hoteles disponibles en esa zona.");
        }
    }

    // M�todo que controla la entrada de n�meros enteros positivos para que no rompa 
    // al introducir cualquier otro tipo de dato, y preguntar� hasta conseguirlo.
    public static int validaEntero(String texto) {
        int n;
        String mensaje = "Error: solo se aceptan numeros positivos.";
        // La variable texto es el texto que se mostrar� por pantalla.
        System.out.print(texto);
        while (true) {
            // Comprobar que sea entero
            while (!sc.hasNextInt()) {
                System.out.print(mensaje + "\n" + texto);
                sc.next();
            }
            n = sc.nextInt();
            sc.nextLine();
            // N�mero positivo
            if (n >= 0) {
                return n;
            } else {
                System.out.print(mensaje + "\n" + texto);
            }
        }
    }

    // M�todo que valida la entrada de texto, para que no se queden campos vacios.
    public static String validaCadena(String texto) {
        String cadena;
        while (true) {
            // La variable texto es el texto que se mostrar� por pantalla.
            System.out.print(texto);
            cadena = sc.nextLine();
            if (cadena.length() == 0 || " ".equals(cadena)) {
                System.out.println("No dejar el campo en blanco.\n");
            } else {
                return cadena;
            }
        }
    }
}
