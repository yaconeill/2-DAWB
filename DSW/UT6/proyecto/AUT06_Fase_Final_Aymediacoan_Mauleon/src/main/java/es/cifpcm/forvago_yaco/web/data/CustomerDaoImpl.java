/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.forvago_yaco.web.data;

import es.cifpcm.forvago_yaco.web.model.Customer;
import java.sql.*;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Yaco
 */
public class CustomerDaoImpl implements CustomerDao {

    private String dbUrl;
    private String dbUser;
    private String dbPassword;
    private String driverClassName;

    @Override
    public Customer insert(Customer customer) {
        Connection conexion = null;
        openConn();
        
        try {
            conexion = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            String queryCustomer = "insert into customer (first_name, last_name, telefono, email, fecha_de_nacimiento) values(?,?,?,?,?)";
            String queryUser = "insert into users (user_id, user_name, password) values(?,?,?)";
            String queryUserGroup = "insert into users_groups (group_id, user_name) values(?,?)";


            try (PreparedStatement pstmt = conexion.prepareStatement(queryCustomer, Statement.RETURN_GENERATED_KEYS)) {
                // Se crea un Statement, para realizar la consulta
                // Se realiza la consulta. Los resultados se guardan en el ResultSet rs

                pstmt.setString(1, customer.getFirstName());
                pstmt.setString(2, customer.getLastName());
                pstmt.setString(3, customer.getLastName());
                pstmt.setString(4, customer.getLastName());
                java.sql.Date sqlDate = new java.sql.Date(customer.getBirthDate().getTime());
                pstmt.setDate(5, sqlDate);

                pstmt.executeUpdate();
                ResultSet rs = pstmt.getGeneratedKeys();

                while (rs.next()) {
                    Short id = rs.getShort(1);
                    customer.setCustomerId(id);
                }
            }
            try (PreparedStatement pstmt = conexion.prepareStatement(queryUser, Statement.RETURN_GENERATED_KEYS)) {
                // Se crea un Statement, para realizar la consulta
                // Se realiza la consulta. Los resultados se guardan en el ResultSet rs

                pstmt.setShort(1, customer.getCustomerId());
                pstmt.setString(2, customer.getUserName());
                pstmt.setString(3, customer.getPassword());

                pstmt.executeUpdate();
            }
            try (PreparedStatement pstmt = conexion.prepareStatement(queryUserGroup, Statement.RETURN_GENERATED_KEYS)) {
                // Se crea un Statement, para realizar la consulta
                // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
                
                Short idGroup = 3; // 3 Para clientes
                pstmt.setShort(1, idGroup);
                pstmt.setString(2, customer.getUserName());

                pstmt.executeUpdate();
            }
            
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            closeConn(conexion);
        }
        return customer;
    }

    @Override
    public Customer update(Customer customer) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Customer delete(Customer customer) {
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
