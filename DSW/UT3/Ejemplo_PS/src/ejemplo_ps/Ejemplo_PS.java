/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ejemplo_ps;

import java.sql.*;

/**
 *
 * @author Yaco
 */
public class Ejemplo_PS {

    /**
     * @param args the command line arguments
     */
    // JDBC driver name and database URL
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/prueba";
    // Database credentials
    static final String USER = "2daw";
    static final String PASS = "2daw";

    public static void main(String[] args) {
        Connection conn = null;
        PreparedStatement stmt = null;
        try {
            //STEP 2: Register JDBC driver
            Class.forName("com.mysql.jdbc.Driver");
            //STEP 3: Open a connection
            System.out.println("Connecting to database...");
            conn = DriverManager.getConnection(DB_URL, USER, PASS);
            //STEP 4: Execute a query
            System.out.println("Creating statement...");
            String sql = "UPDATE contacto set telefono=? WHERE nombre=?";
            stmt = conn.prepareStatement(sql);

            //Bind values into the parameters.
            stmt.setString(1, "444444444"); // This would set age
            stmt.setString(2, "Antonio"); // This would set ID

            // Let us update age of the record with ID = 102;
            int rows = stmt.executeUpdate();
            System.out.println("Rows impacted : " + rows);
            // Let us select all the records and display them.
            sql = "SELECT nombre, apellidos, telefono FROM contacto";
            ResultSet rs = stmt.executeQuery(sql);
            //STEP 5: Extract data from result set
            while (rs.next()) {
                //Retrieve by column name
                String nombre = rs.getString("nombre");
                String apellido = rs.getString("apellidos");
                String telefono = rs.getString("telefono");

                //Display values
                System.out.print("Nombre: " + nombre);
                System.out.print(", Apellido: " + apellido);
                System.out.println(", Teléfono: " + telefono);
            }
            //STEP 6: Clean-up environment
            rs.close();
            stmt.close();
            conn.close();
        } catch (SQLException se) {
            //Handle errors for JDBC
            se.printStackTrace();
        } catch (Exception e) {
            //Handle errors for Class.forName
            e.printStackTrace();
        } finally {
            //finally block used to close resources
            try {
                if (stmt != null) {
                    stmt.close();
                }
            } catch (SQLException se2) {
            }// nothing we can do
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException se) {
                se.printStackTrace();
            }//end finally try
        }//end try
        System.out.println("Goodbye!");
    }//end main
}//end JDBCExample
