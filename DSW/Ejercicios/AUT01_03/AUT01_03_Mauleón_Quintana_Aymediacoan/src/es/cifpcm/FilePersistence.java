/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm;

import java.util.List;
import java.util.ArrayList;
import java.io.*;

/**
 * @author Yaco
 */
public class FilePersistence implements Persistence {
    // Lista en la que volcaran los registros del fichero
    static List<Hotel> hotelList;
    // Ruta en la que se crea el fichero que busca la ruta Documents del usuario
    // activo ya que se usa una variable de entorno para localizar el nombre del usuario.
    static String ruta = System.getProperty("user.home") + "\\Documents\\Hoteles.txt";

    // Método que crea el fichero en la ruta dada, en caso de no existir.
    static void open() throws IOException {
        // Crea el flujo para escribir en el archivo.
        File archivo = new File(ruta);
        BufferedWriter bw;
        if (archivo.exists()) {
            // Crea el flujo para escribir el fichero y pasa el valor TRUE 
            // para que inserte en la última línea y no sobreescriba.
            bw = new BufferedWriter(new FileWriter(archivo, true));
        } else {
            bw = new BufferedWriter(new FileWriter(archivo));
        }
        bw.close();
    }

    // Método que guarda los atrib del objeto hotel que se le pasa por parámero,
    // estos atrib se insetaran en el fichero con la separación de dos puntos, para
    // luego poder acceder a ellos más facilmente.
    static void save(Hotel hotel) {
        FileWriter fichero = null;
        PrintWriter pw = null;
        try {
            // Crea el flujo para escribir en el fichero y pasa el valor TRUE 
            // para que inserte en la última línea y no sobreescriba.
            fichero = new FileWriter(ruta, true);
            pw = new PrintWriter(fichero);
            // Accede a las prop y se pasan los valores para escibirlos en el fichero.
            pw.println(hotel.getNombre() + ":" + hotel.getLocalidad()
                    + ":" + hotel.getEstrellas() + ":" + hotel.getPrecioNoche());
        } catch (IOException e) {
            System.out.println(e);
        } finally {
            try {
                // Se usa finally para asegurar que se cierra el fichero.
                if (null != fichero) {
                    fichero.close();
                }
            } catch (IOException e2) {
                System.out.println(e2);
            }
        }
    }

    // Método que borra la línea del fichero donde coincida el nombre que recibe
    // como parámetro.
    static void delete(String busca) throws IOException {
        try {
            // Crea el flujo para leer desde el archivo
            File inFile = new File(ruta);

            if (!inFile.isFile()) {
                System.out.println("El fichero no existe");
                return;
            }
            //Crea el ficherotemporal que luego será renombrado como el fichero original
            File tempFile = new File(inFile.getAbsolutePath() + ".tmp");

            BufferedReader br = new BufferedReader(new FileReader(ruta));
            PrintWriter pw = new PrintWriter(new FileWriter(tempFile));

            String line = null;

            //Lee línea a línea desde el fichero original y las escribe en el temp
            //a menos que el contenido coincida con el que se quiere eliminar.
            while ((line = br.readLine()) != null) {
                if (!line.contains(busca.toUpperCase())) {
                    pw.println(line);
                }
            }
            pw.flush();
            pw.close();
            br.close();

            //Borrar en el fichero original
            if (!inFile.delete()) {
                System.out.println("No se ha podido borrar el registro");
                return;
            }

            //Se renombra el fichero al nombre original.
            if (!tempFile.renameTo(inFile)) {
                System.out.println("No se ha podido renombrar el fichero");
            } else {
                System.out.println("Se ha borrado correctamente");
            }
        } catch (FileNotFoundException ex) {
            System.out.println(ex);
        } catch (IOException ex) {
            System.out.println(ex);
        }
    }
    // Método que lee desde el fichero, separa los campos con split() y los mete
    // en un array para luego meterlo en una lista de tipo hotel y devolverla.
    static List<Hotel> list() throws FileNotFoundException, IOException {
        String cadena;
        String[] separar;
        hotelList = new ArrayList<>();
        // Crea el flujo para leer desde el archivo
        FileReader f = new FileReader(ruta);
        BufferedReader b = new BufferedReader(f);
        while ((cadena = b.readLine()) != null) {
            try {
                // Filtramos cadena para que no entre cuando ésta está vacía
                if (!"".equals(cadena)) {
                    separar = cadena.split(":");
                    Hotel newHotel = new Hotel();
                    newHotel.setNombre(separar[0]);
                    newHotel.setLocalidad(separar[1]);
                    newHotel.setEstrellas(Integer.parseInt(separar[2]));
                    newHotel.setPrecioNoche(Integer.parseInt(separar[3]));
                    hotelList.add(newHotel);
                }
            } catch (NumberFormatException e) {
                System.out.println("error" + e);
            }
        }
        b.close();
        return hotelList;
    }
}
