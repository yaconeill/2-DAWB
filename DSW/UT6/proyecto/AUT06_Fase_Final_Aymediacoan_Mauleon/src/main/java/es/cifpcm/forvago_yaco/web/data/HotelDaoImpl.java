/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.data;

import es.cifpcm.forvago_yaco.web.model.Hotel;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Yaco
 */
public class HotelDaoImpl implements HotelDao {

    private String dbUrl;
    private String dbUser;
    private String dbPassword;
    private String driverClassName;

    @Override
    public Hotel insert(Hotel hotel) {
        Connection conexion = null;
        openConn();

        try {
            conexion = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            String queryCustomer = "insert into hotels (hotel, rating, rooms, "
                    + "idMunicipio, postalCode, address ,phone, fax, services, hotelPicture) values(?,?,?,?,?,?,?,?,?,?)";

            try (PreparedStatement pstmt = conexion.prepareStatement(queryCustomer, Statement.RETURN_GENERATED_KEYS)) {
                // Se crea un Statement, para realizar la consulta
                // Se realiza la consulta. Los resultados se guardan en el ResultSet rs

                pstmt.setString(1, hotel.getHotel());
                pstmt.setInt(2, hotel.getRating());
                pstmt.setInt(3, hotel.getRooms());
                pstmt.setShort(4, hotel.getIdMunicipio());
                pstmt.setInt(5, hotel.getPostalCode());
                pstmt.setString(6, hotel.getAddress());
                pstmt.setString(7, hotel.getPhone());
                pstmt.setString(8, hotel.getFax());
                pstmt.setString(9, hotel.getServices());
                pstmt.setString(10, hotel.getHotelPicture());

                pstmt.executeUpdate();
                ResultSet rs = pstmt.getGeneratedKeys();

                while (rs.next()) {
                    Short id = rs.getShort(1);
                    hotel.setIdHotel(id);
                }
            }

        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            closeConn(conexion);
        }
        return hotel;
    }

    @Override
    public Hotel update(Hotel customer) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Hotel delete(Hotel customer) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
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
