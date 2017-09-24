/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es;
import es.cifpcm.io.file.FileCreator;
import java.util.Scanner;
/**
 *
 * @author Aymediacoán Mauleón Quintana
 */
public class Es {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("@author Aymediacoán Mauleón Quintana");
        // Se solicitan lo datos por pantalla y se guardan en las variables.
        System.out.print("Introduce título: ");
        String titulo = sc.nextLine();
        System.out.print("Introduce nombre: ");
        String nombre = sc.nextLine();   
        // Se hace una llamada a la función generateFile, pasando como parámetro
        // las variables titulo y nombre, para generar el fichero html.
        generateFile(titulo, nombre);
    }
    
    static void generateFile(String t, String n){
        // Se crea un string para guardar la variable de entorno
        // de la carpeta Temp.
        String path;
        path = System.getenv("Temp");
        // Se crea una variable de tipo StringBuffer donde se almacenarán las
        // distintas etiquetas html anexandolas.
        StringBuffer cadena = new StringBuffer();
        cadena.append("<html>\n");
        cadena.append("<head>\n");
        cadena.append("\t<title>");
        cadena.append(t);
        cadena.append("</title>\n");
        cadena.append("</head>\n");        
        cadena.append("<body>\n");
        cadena.append("<h1>Hola: ");
        cadena.append(n);
        cadena.append("</h1>");
        cadena.append("</body>\n");
        cadena.append("</html>");
        // convertimos la cadena en string.
        String html = cadena.toString();
        // Se crea un fichero pasando como parámetro la ruta y la cadena anexada        
        FileCreator.createFile(path + "\\Hola.html", html);
    }
}
