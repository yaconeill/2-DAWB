/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm;

import static es.cifpcm.ForVagosApp.hotelList;
import java.util.List;
import java.util.ArrayList;
import java.io.*;

/**
 * @author Yaco
 */
public class FilePersistence {

    static List<Hotel> hotelList;

    public static void open() throws IOException {
        String ruta = "c:\\Users\\Yaco\\Hoteles.txt";
        File archivo = new File(ruta);
        BufferedWriter bw;
        if (archivo.exists()) {
            bw = new BufferedWriter(new FileWriter(archivo));
            bw.write("El fichero de texto ya estaba creado.");
        } else {
            bw = new BufferedWriter(new FileWriter(archivo));
            bw.write("Acabo de crear el fichero de texto.");
        }
        bw.close();
    }

    static void close() {

    }

    static void save(Hotel hotel) {
        FileWriter fichero = null;
        PrintWriter pw = null;
        try {
            fichero = new FileWriter("c:\\Users\\Yaco\\Hoteles.txt", true);
            pw = new PrintWriter(fichero);
            pw.println(hotel.getNombre() + "-" + hotel.getLocalidad()
                    + "-" + hotel.getEstrellas() + "-" + hotel.getPrecioNoche());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                // Nuevamente aprovechamos el finally para 
                // asegurarnos que se cierra el fichero.
                if (null != fichero) {
                    fichero.close();
                }
            } catch (Exception e2) {
                e2.printStackTrace();
            }
        }
    }

    static void delete(String busca) throws IOException {
        try {

            File inFile = new File("c:\\Users\\Yaco\\Hoteles.txt");

            if (!inFile.isFile()) {
                System.out.println("Parameter is not an existing file");
                return;
            }

            //Construct the new file that will later be renamed to the original filename.
            File tempFile = new File(inFile.getAbsolutePath() + ".tmp");

            BufferedReader br = new BufferedReader(new FileReader("c:\\Users\\Yaco\\Hoteles.txt"));
            PrintWriter pw = new PrintWriter(new FileWriter(tempFile));

            String line = null;

            //Read from the original file and write to the new
            //unless content matches data to be removed.
            while ((line = br.readLine()) != null) {

                if (!line.contains(busca.toUpperCase())) {

                    pw.println(line);
                    pw.flush();
                }
            }
            pw.close();
            br.close();

            //Delete the original file
            if (!inFile.delete()) {
                System.out.println("Could not delete file");
                return;
            }

            //Rename the new file to the filename the original file had.
            if (!tempFile.renameTo(inFile)) {
                System.out.println("Could not rename file");
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
        FileReader f = new FileReader("c:\\Users\\Yaco\\Hoteles.txt");
        BufferedReader b = new BufferedReader(f);
        while ((cadena = b.readLine()) != null) {
            try {
                // Filtramos cadena para no entre cuando cadena esté vacía
                if (!"".equals(cadena)) {
                    separar = cadena.split("-");
                    Hotel newHotel = new Hotel();
                    //int star = Integer.parseInt(separar[2]);
                    //Hotel newHotel = new Hotel(separar[0], separar[1], star, Integer.parseInt(separar[3]));
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
