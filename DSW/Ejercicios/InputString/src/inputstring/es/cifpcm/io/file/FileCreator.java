/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package inputstring.es.cifpcm.io.file;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 *
 * @author Yaco
 */
public class FileCreator {

    /**
     * Crea un archivo de texto, con el nombre y ruta indicados en path y el
     * texto pasado en el argumento text
     *
     * @param path Ruta y nombre del archivo de texto a crear (ej:
     * C:/TEMP/hola.html)
     * @param text String que contiene el texto de la página
     */
    public static void createFile(String path, String text) {
        File file = new File(path);
        try {
            FileWriter fw = new FileWriter(file);
            fw.write(text);
            fw.close();
        } catch (IOException e) {
            System.err.println(e.getMessage());
            e.printStackTrace();
        }
    }
}
