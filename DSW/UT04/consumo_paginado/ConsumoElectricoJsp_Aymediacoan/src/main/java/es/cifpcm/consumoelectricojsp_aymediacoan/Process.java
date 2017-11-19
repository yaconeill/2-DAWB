/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.consumoelectricojsp_aymediacoan;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Yaco
 */
public class Process {

    static private String _dbUrl;
    static private String _dbUser;
    static private String _dbPassword;
    static private Integer _dbPageSize;
    static private String _driverClassName;

    static private Integer primerReg = 0;
    static private Integer tableSize = 0;
    static List<Cliente> clientList;

    // Extrae los datos de los clientes de la base de datos y los guarda en una lista de tipo Cliente
    public static List retrieveDataClient(Integer page) {
        Connection conexion = null;
        clientList = new ArrayList<>();

        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // En este caso nos conectamos a la base de datos prueba
            // con el usuario 2daw y contraseña 2daw
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            //s.setMaxRows(dbPageSize);
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            String cadena = "select * from misclientes LIMIT " + primerReg + "," + 20;
            ResultSet rs = s.executeQuery(cadena);
//            ResultSet rs = s.executeQuery("select * from misclientes ");

            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                Cliente newClient = new Cliente(rs.getInt("id"), rs.getString(2), rs.getString(3),
                        rs.getString(4), rs.getString(5), rs.getInt(6), rs.getString(7), rs.getString(8));
                clientList.add(newClient);
            }
            return clientList;
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
        return null;
    }

    public static void rowsInDB() {
//        _driverClassName = driverClassName;
//        _dbUrl = dbUrl;
//        _dbUser = dbUser;
//        _dbPassword =dbPassword;
        Connection conexion = null;
        try {
            // Cargar el driver
            Class.forName("com.mysql.jdbc.Driver");
            // Se obtiene una conexión con la base de datos.
            // con el usuario 2dawa y contraseña 2dawa
            conexion = DriverManager.getConnection("jdbc:mysql://localhost/consumoelectrico", "2dawa",
                    "2dawa");
            // Se crea un Statement, para realizar la consulta
            Statement s = conexion.createStatement();
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            String cadena = "select count(id) from misclientes";
            ResultSet rs = s.executeQuery(cadena);
            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                tableSize = rs.getInt(1);
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
//    public void init(){
//        super.init(config);
//        try {
//            String configBundleName = config.getInitParameter("app.config");
//            ResourceBundle rb = ResourceBundle.getBundle(configBundleName);
//            this.dbUrl = rb.getString("database.url");
//            this.dbUser = rb.getString("database.user");
//            this.dbPassword = rb.getString("database.password");
//            this.dbPageSize = rb.getString("database.pageSize") == null ? DEFAULT_PAGESIZE : Integer.parseInt(rb.getString("database.pageSize"));
//            this.driverClassName = rb.getString("database.driver");
//            Class.forName(driverClassName);
//
//        } catch (ClassNotFoundException ex) {
//            Logger.getLogger(BuscadorConsumoElectricoServlet.class
//                    .getName()).log(Level.SEVERE, null, ex);
//        }
//    }
}
