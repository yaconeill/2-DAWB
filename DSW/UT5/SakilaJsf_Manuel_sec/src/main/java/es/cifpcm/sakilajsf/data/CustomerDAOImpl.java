/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf.data;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import es.cifpcm.sakilajsf.web.model.Customer;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Manuel Melián Hernández
 */
public class CustomerDAOImpl implements CustomerDAO {
    private String dbUrl;
    private String dbUser;
    private String dbPassword;
    
    public CustomerDAOImpl() {
        try {
            String configBundleName = "sakila";
            ResourceBundle rb = ResourceBundle.getBundle(configBundleName);
            this.dbUrl = rb.getString("database.url");
            this.dbUser = rb.getString("database.user");
            this.dbPassword = rb.getString("database.password");
            String driverClassName = rb.getString("database.driver");
            
            Class.forName(driverClassName);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
//    @Override
//    public List<Customer> selectAll() {
//        List<Customer> customers = new ArrayList<>();
//        
//        Connection conn;
//        try {
//            conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
//            Statement s = conn.createStatement();
//            ResultSet rs = s.executeQuery("select * from customer");
//            while(rs.next()) {
//                customers.add(new Customer(
//                    rs.getInt("customer_id"), 
//                    rs.getInt("store_id"), 
//                    rs.getString("first_name"), 
//                    rs.getString("last_name"), 
//                    rs.getString("email"), 
//                    rs.getInt("address_id"),
//                    rs.getInt("active"),
//                    rs.getTimestamp("create_date"),
//                    rs.getTimestamp("last_update")
//                ));
//            }
//            rs.close();
//            s.close();
//            conn.close();
//        } catch(SQLException ex) {
//            ex.getMessage();
//        }
//        return customers;
//    }
    
    @Override
    public List<Customer> selectAll(){
        List<Customer> customers = new ArrayList<>();
        
        com.mysql.jdbc.Connection connection = null;
        com.mysql.jdbc.PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try {
            //Establecer conexión
            connection = (com.mysql.jdbc.Connection) DriverManager.getConnection(this.dbUrl, this.dbUser, this.dbPassword);
            
            //Query de inserción
            String query = "select * from customer";
            pstmt = (com.mysql.jdbc.PreparedStatement) connection.prepareStatement(query);
            
            rs = pstmt.executeQuery();
                
            while(rs.next()) {
                customers.add(new Customer(
                    rs.getInt("customer_id"), 
                    rs.getInt("store_id"), 
                    rs.getString("first_name"), 
                    rs.getString("last_name"), 
                    rs.getString("email"), 
                    rs.getInt("address_id"),
                    rs.getInt("active"),
                    rs.getTimestamp("create_date"),
                    rs.getTimestamp("last_update")
                ));
            }
        } catch(Exception ex) {
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {//Cierre de conexiones
                pstmt.close();
            } catch(Exception ex){}
            try {//Cierre de result
                rs.close();
            } catch(Exception ex){}
            try {//Cierre de conexiones
                connection.close();
            } catch(Exception ex){}
        }
        return customers;
    }
    
    /**
     *
     * @param elemento
     * @return
     * @throws Exception
     */
//    public Customer insert2(Customer elemento) throws Exception {
//        Connection conn;
//        try {
//            conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
//            
//            String query = "INSERT INTO `customer`(`store_id`, `first_name`, `last_name`, `email`, `address_id`, `active`, `create_date`) VALUES (?,?,?,?,?,?,?)";
//            PreparedStatement pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
//            pstmt.setInt(1, elemento.getStoreId());
//            pstmt.setString(2, elemento.getFirstName());
//            pstmt.setString(3, elemento.getLastName());
//            pstmt.setString(4, elemento.getEmail());
//            pstmt.setInt(5, elemento.getAddressId());
//            pstmt.setInt(6, elemento.getActive());
//            pstmt.setTimestamp(7, elemento.getCreateDate());
//            
//            pstmt.executeUpdate();
//            ResultSet rs = pstmt.getGeneratedKeys();
//            if (rs.next()) {
//                elemento.setCustomerId((int)(rs.getShort(1)));
//            }
//            pstmt.close();
//            conn.close();
//        } catch(SQLException ex) {
//            ex.getMessage();
//            elemento.setCustomerId(-1);
//        }
//        return elemento;
//    }
    
    @Override
    public Customer insert(Customer element) throws Exception {
        com.mysql.jdbc.Connection connection = null;
        com.mysql.jdbc.PreparedStatement pstmt = null;
        ResultSet rs = null;
        
        try {
            //Establecer conexión
            connection = (com.mysql.jdbc.Connection) DriverManager.getConnection(this.dbUrl, this.dbUser, this.dbPassword);
            
            //Query de inserción
            String query = "INSERT INTO `customer`(`store_id`, `first_name`, `last_name`, `email`, `address_id`, `active`) VALUES (?,?,?,?,?,?)";
            pstmt = (com.mysql.jdbc.PreparedStatement) connection.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
            
            pstmt.setInt(1, element.getStoreId());
            pstmt.setString(2, element.getFirstName());
            pstmt.setString(3, element.getLastName());
            pstmt.setString(4, element.getEmail());
            pstmt.setInt(5, element.getAddressId());
            pstmt.setInt(6, element.getActive());
            
            pstmt.executeUpdate();
            
            rs = pstmt.getGeneratedKeys();
            rs.next();
            
            element.setCustomerId((int)(rs.getShort(1)));
            List<Timestamp> times = getCustomerTimes(element.getCustomerId());
            element.setCreateDate(times.get(0));
            element.setLastUpdate(times.get(1));
            
        } catch(Exception ex){
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
            throw new Exception("No se ha podido insertar en la base de datos.");
        } finally {
            try {//Cierre de conexiones
                pstmt.close();
            } catch(Exception ex){}
            try {//Cierre de result
                rs.close();
            } catch(Exception ex) {}
            try {//Cierre de conexiones
                connection.close();
            } catch(Exception ex) {}
        }
        return element;
    }
    
    private List<Timestamp> getCustomerTimes(int id){
        List <Timestamp> update = new ArrayList();
        
        Connection connection = null;
        PreparedStatement pstmt = null;
        ResultSet result = null;
        
        try {
            //Establecer conexión
            connection = (Connection) DriverManager.getConnection(this.dbUrl, this.dbUser, this.dbPassword);
            
            //Query de inserción
            String query = "SELECT create_date, last_update FROM customer WHERE customer_id = ?";
            pstmt = (PreparedStatement) connection.prepareStatement(query);
            pstmt.setInt(1, id);
            result = pstmt.executeQuery();
                
            if(result.next()) {
                update.add(result.getTimestamp(1));
                update.add(result.getTimestamp(2));
            }
        } catch(Exception ex) {
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {//Cierre de conexiones
                pstmt.close();
            } catch(Exception ex) {}
            try {//Cierre de result
                result.close();
            } catch(Exception ex) {}
            try {//Cierre de conexiones
                connection.close();
            } catch(Exception ex){}
        }
        return update;
    }
}
