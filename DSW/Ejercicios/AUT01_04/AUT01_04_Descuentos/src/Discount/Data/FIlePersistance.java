/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Discount.Data;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

/**
 *
 * @author Yaco
 */
public class FIlePersistance {

    static String ruta = System.getProperty("user.home") + "\\Documents\\Customers.txt";

    public static ArrayList<String> open(String user) throws FileNotFoundException, IOException {
        String cadena;
        ArrayList separar = new ArrayList();
        // Crea el flujo para leer desde el archivo
        FileReader f = new FileReader(ruta);
        BufferedReader b = new BufferedReader(f);
        while ((cadena = b.readLine()) != null) {
            try {
                // Filtramos cadena para que no entre cuando ésta está vacía
                if (!"".equals(cadena)) {
                    separar.add(cadena.split(":"));                                        
                }
            } catch (NumberFormatException e) {
                System.out.println("error" + e);
            }
        }
        b.close();
        return separar;
    }
}
