/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf.data;

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import es.cifpcm.sakilajsf.web.model.Actor;
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
 * @author Jaime
 */
public class ActorDaoImpl implements ActorDao {

    private String dbUrl;
    private String dbUser;
    private String dbPassword;
    
    
    public ActorDaoImpl(){
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
    
    /**
     *
     * @return
     */
    @Override
    public List<Actor> selectAll(){
        List<Actor> actors= new ArrayList();
        
        Connection connection=null;
        PreparedStatement pstmt=null;
        ResultSet result=null;
        
        try{
            //Establecer conexión
            connection = (Connection) DriverManager
                    .getConnection(this.dbUrl, this.dbUser, this.dbPassword);
            
            //Query de inserción
            String query = "SELECT * FROM actor";
            pstmt= (PreparedStatement) connection.prepareStatement(query);
            
            result=pstmt.executeQuery();
                
            while(result.next()) {
                  Actor actor=new Actor();
                  actor.setActorId(result.getInt("actor_id"));
                  actor.setFirstName(result.getString("first_name"));
                  actor.setLastName(result.getString("last_name"));
                  actor.setLastUpdate(result.getTimestamp("last_update"));
                  
                  actors.add(actor);
              }
        }catch(Exception ex){
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try{//Cierre de conexiones
                pstmt.close();
            }catch(Exception ex){

            }
            try {//Cierre de result
                result.close();
            }catch(Exception ex){
                
            }
            try{//Cierre de conexiones
                connection.close();
            }catch(Exception ex){
            }
        }
        return actors;
    }
    
    @Override
    public Actor insert(Actor element) throws Exception{
        Connection connection=null;
        PreparedStatement pstmt=null;
        ResultSet result=null;
        
        try{
            //Establecer conexión
            connection = (Connection) DriverManager
                    .getConnection(this.dbUrl, this.dbUser, this.dbPassword);
            
            //Query de inserción
            String query = "INSERT INTO `actor`(`first_name`, `last_name`) VALUES (?,?)";
            pstmt= (PreparedStatement) connection.prepareStatement(
                    query,Statement.RETURN_GENERATED_KEYS);
            
            pstmt.setString(1, element.getFirstName());
            pstmt.setString(2, element.getLastName());
            
            pstmt.executeUpdate();
            result=pstmt.getGeneratedKeys();
              
            result.next();
            
            element.setActorId(result.getInt(1));
            element.setLastUpdate(
                    getActorUpdateTime(
                            element.getActorId()
                    )
            );
            
        }catch(Exception ex){
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
            throw new Exception("No se ha podido insertar en la base de datos.");
        }finally{
            try{//Cierre de conexiones
                pstmt.close();
            }catch(Exception ex){

            }
            try {//Cierre de result
                result.close();
            }catch(Exception ex){
                
            }
            try{//Cierre de conexiones
                connection.close();
            }catch(Exception ex){
            }
        }
        return element;
    }
    
    private Timestamp getActorUpdateTime(int id){
        Timestamp update = null;
        
        Connection connection=null;
        PreparedStatement pstmt=null;
        ResultSet result=null;
        
        try{
            //Establecer conexión
            connection = (Connection) DriverManager
                    .getConnection(this.dbUrl, this.dbUser, this.dbPassword);
            
            //Query de inserción
            String query = "SELECT last_update FROM actor WHERE actor_id=?";
            pstmt= (PreparedStatement) connection.prepareStatement(query);
            pstmt.setInt(1,id);
            result=pstmt.executeQuery();
                
            result.next();
            update=result.getTimestamp("last_update");
            
        }catch(Exception ex){
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }finally{
            try{//Cierre de conexiones
                pstmt.close();
            }catch(Exception ex){

            }
            try {//Cierre de result
                result.close();
            }catch(Exception ex){
                
            }
            try{//Cierre de conexiones
                connection.close();
            }catch(Exception ex){
            }
        }
        
        return update;
    }
    
    public static ActorDaoImpl getInstance(){
        return new ActorDaoImpl();
    }
}
