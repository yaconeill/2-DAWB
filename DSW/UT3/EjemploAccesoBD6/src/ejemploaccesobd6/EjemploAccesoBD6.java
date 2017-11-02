/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejemploaccesobd6;

import java.sql.*;

/**
 *
 * @author Yaco
 */
public class EjemploAccesoBD6 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Connection conexion = null;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            conexion
                    = DriverManager.getConnection("jdbc:mysql://localhost/prueba", "2daw", "2daw");
//Indicamos que el ResultSet será desplazable y modificable
            Statement s = conexion.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,
                    ResultSet.CONCUR_UPDATABLE);
            ResultSet rs = s.executeQuery("select * from personas");
//Recorrer el ResultSet desde el final hasta el principio
            rs.afterLast();
            while (rs.previous()) {
                System.out.println(rs.getInt(1) + " " + rs.getString(2) + " " 
                        + rs.getString(3) + " " + rs.getDate(4));
            }

// modificar el campo nombre (2) del registro 2 del ResultSet
// el cambio también se produce en la base de datos
            rs.absolute(2);
            rs.updateString(2, "Ana");
            rs.updateString(3, "Lozano");
            rs.updateRow();
//Recorrer el ResultSet para comprobar la modificación.
//Para recorrer el ResultSet desde el principio hasta el final nos debemos situar
//de nuevo al principio
            rs.beforeFirst();
            while (rs.next()) {
                System.out.println(rs.getInt(1) + " " + rs.getString(2)
                        + " " + rs.getString(3) + " " + rs.getDate(4));
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } catch (ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                if (conexion != null) {
                    conexion.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
    }
}
