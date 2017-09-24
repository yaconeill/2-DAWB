/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package varibleentorno;


/**
 *
 * @author Yaco
 */
public class VaribleEntorno {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Integer tam = args.length;
        String path = System.getenv("path");
        String cadena[] = path.split(";");
        //for(String ent : cadena)
        System.out.println(cadena[0]);        
    }

}
