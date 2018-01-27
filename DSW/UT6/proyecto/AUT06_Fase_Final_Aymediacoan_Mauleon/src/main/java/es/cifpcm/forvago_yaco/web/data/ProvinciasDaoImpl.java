/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.data;

import es.cifpcm.forvago_yaco.web.model.Provincias;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Yaco
 */
public class ProvinciasDaoImpl implements ProvinciasDao {

    private List<Provincias> selectAll;
    private String dbUrl;
    private String dbUser;
    private String dbPassword;
    private String driverClassName;

    public ProvinciasDaoImpl() {
        selectAll = new ArrayList<>();
        Connection conexion = null;
        openConn();
        try {
            conexion = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            // Se crea un Statement, para realizar la consulta
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            String cadena = "select * from provincias";
            PreparedStatement s = conexion.prepareStatement(cadena);
            ResultSet rs = s.executeQuery(cadena);

            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                Provincias provincia = new Provincias(rs.getShort(1), rs.getString(2));
                selectAll.add(provincia);
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            closeConn(conexion);
        }
    }

    @Override
    public List<Provincias> selectAll() {
        return selectAll;
    }

    private void openConn() {
        try {
            ResourceBundle rb = ResourceBundle.getBundle("forvagos");
            this.dbUrl = rb.getString("database.url");
            this.dbUser = rb.getString("database.user");
            this.dbPassword = rb.getString("database.password");
            this.driverClassName = rb.getString("database.driver");
            Class.forName(driverClassName);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ProvinciasDao.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void closeConn(Connection conn) {
        try {
            if (conn != null) {
                conn.close();
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
        }
    }
}
