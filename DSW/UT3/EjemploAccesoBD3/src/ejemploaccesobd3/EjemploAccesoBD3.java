/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejemploaccesobd3;

import java.sql.*;

/**
 *
 * @author Yaco
 */
public class EjemploAccesoBD3 {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        Connection conexion = null;
        int id;
        try {
// Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/prueba", "2daw", "2daw");
            // Se crea un Statement, para realizar el query
            Statement s = conexion.createStatement();

            // Se realiza la consulta
            // Queremos obtener el id del primer contacto con nombre Juan
            ResultSet rs = s.executeQuery("SELECT id FROM contacto WHERE nombre='Juan'");

            if (rs.next()) { //Si rs.next() devuelve true significa que al menos hay un registro
                id = rs.getInt("id"); //se obtienen su id
//se actualiza el registro
                s.executeUpdate("UPDATE contacto SET telefono='987654321' WHERE id=" + id);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } catch (ClassNotFoundException e) {
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
