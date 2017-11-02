/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejemploaccesobd1;

/**
 *
 * @author Yaco
 */
import java.sql.*;

public class EjemploAccesoBD1 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Connection conexion = null;
        try {
// Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
// Se obtiene una conexión con la base de datos.
// En este caso nos conectamos a la base de datos prueba
// con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/prueba", "2daw",
                    "2daw");
// Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
// Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            ResultSet rs = s.executeQuery("select * from personas");
// Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                System.out.println(rs.getInt("id") + " " + rs.getString(2) + " " + rs.getString(3)
                        + " " + rs.getDate(4));
            }
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
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
