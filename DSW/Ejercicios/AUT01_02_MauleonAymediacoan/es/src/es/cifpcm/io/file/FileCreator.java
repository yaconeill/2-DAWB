/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.io.file;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

/**
 *
 * @author Aymediacoán Mauleón Quintana
 */
public class FileCreator {

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
