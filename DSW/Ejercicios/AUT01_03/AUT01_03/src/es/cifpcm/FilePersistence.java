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

    static List<Hotel> hotelList;
    static String ruta = System.getProperty("user.home") + "\\Documents\\Hoteles.txt";

    static void open() throws IOException {
        File archivo = new File(ruta);
        BufferedWriter bw;
        if (archivo.exists()) {
            bw = new BufferedWriter(new FileWriter(archivo));
        } else {
            bw = new BufferedWriter(new FileWriter(archivo));
        }
        bw.close();
    }

    static void close() {

    }

    static void save(Hotel hotel) {
        FileWriter fichero = null;
        PrintWriter pw = null;
        try {
            fichero = new FileWriter(ruta, true);
            pw = new PrintWriter(fichero);
            pw.println(hotel.getNombre() + "-" + hotel.getLocalidad()
                    + "-" + hotel.getEstrellas() + "-" + hotel.getPrecioNoche());
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

    static void delete(String busca) throws IOException {
        try {

            File inFile = new File(ruta);

            if (!inFile.isFile()) {
                System.out.println("Parameter is not an existing file");
                return;
            }
            //Crea el nuevo fichero que luego será renombrado como el fichero original
            File tempFile = new File(inFile.getAbsolutePath() + ".tmp");

            BufferedReader br = new BufferedReader(new FileReader(ruta));
            PrintWriter pw = new PrintWriter(new FileWriter(tempFile));

            String line = null;

            //Lee desde el fichero original y escribe en el nuevo
            //a menos que el contenido coincida con los datos que se eliminarán.
            while ((line = br.readLine()) != null) {
                if (!line.contains(busca.toUpperCase())) {
                    pw.println(line);
                    pw.flush();
                }
            }
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
            }

        } catch (FileNotFoundException ex) {
            System.out.println(ex);
        } catch (IOException ex) {
            System.out.println(ex);
        }
    }

    static List<Hotel> list() throws FileNotFoundException, IOException {
        String cadena;
        String[] separar;
        hotelList = new ArrayList<Hotel>();
        FileReader f = new FileReader(ruta);
        BufferedReader b = new BufferedReader(f);
        while ((cadena = b.readLine()) != null) {
            try {
                // Filtramos cadena para no entre cuando cadena esté vacía
                if (!"".equals(cadena)) {
                    separar = cadena.split("-");
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
