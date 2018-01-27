/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilaorm_yaco.data;

import es.cifpcm.sakilaorm_yaco.model.Actor;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.hibernate.Session;

/**
 *
 * @author Yaco
 */
public class ActorDaoImpl implements ActorDao {

    private List<Actor> selectAll;
    private String dbUrl;
    private String dbUser;
    private String dbPassword;
    private String driverClassName;

    public ActorDaoImpl() {
    }

    @Override
    public void deleteActor(Actor actor) {
        selectAll.remove(actor);
    }

    @Override
    public List<Actor> selectAll() {
        List<Actor> aList = new ArrayList<>();
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            session.beginTransaction();
            aList = session.createQuery("FROM Actor").list();
            System.out.println(aList.get(3).getFirstName());
            session.beginTransaction().commit();
        } catch (Exception e) {
            session.getTransaction().rollback();
        }finally{
            session.close();
        }
        return aList;
    }

    @Override
    public Actor getActor(int actorId) {
        return selectAll.get(actorId);
    }

    @Override
    public void updateActor(Actor actor) {
        selectAll.get(actor.getActorId()).setFirstName(actor.getFirstName());
    }

//    public Actor insert(Actor actor) {
//        Connection conn = null;
//        openConn();
//        try {
//            conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
//            String query = "insert into actor (first_name, last_name) values(?,?)";
//
//            try (PreparedStatement pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
//                // Se crea un Statement, para realizar la consulta
//                // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
//
//                pstmt.setString(1, actor.getFirstName());
//                pstmt.setString(2, actor.getLastName());
//
//                pstmt.executeUpdate();
//                ResultSet rs = pstmt.getGeneratedKeys();
//
//                while (rs.next()) {
//                    Short id = rs.getShort(1);
//                    actor.setActorId((int) id);
//                    actor.setLastUpdate(
//                    getActorUpdateTime(
//                            actor.getActorId()
//                    )
//            );
//                }
//            }
//        } catch (SQLException e) {
//            actor.setActorId(-1);
//            System.out.println(e.getMessage());
//        } finally { // Se cierra la conexión con la base de datos.
//            closeConn(conn);
//        }
//        return actor;
//    }
//    
//    private Timestamp getActorUpdateTime(int id){
//        Timestamp update = null;
//        
//        Connection connection=null;
//        PreparedStatement pstmt=null;
//        ResultSet result=null;
//        
//        try{
//            //Establecer conexión
//            connection = (Connection) DriverManager
//                    .getConnection(this.dbUrl, this.dbUser, this.dbPassword);
//            
//            //Query de inserción
//            String query = "SELECT last_update FROM actor WHERE actor_id=?";
//            pstmt= (PreparedStatement) connection.prepareStatement(query);
//            pstmt.setInt(1,id);
//            result=pstmt.executeQuery();
//                
//            result.next();
//            update=result.getTimestamp("last_update");
//            
//        }catch(SQLException ex){
//            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
//        }finally{
//            try{//Cierre de conexiones
//                pstmt.close();
//            }catch(SQLException ex){
//
//            }
//            try {//Cierre de result
//                result.close();
//            }catch(Exception ex){
//                
//            }
//            try{//Cierre de conexiones
//                connection.close();
//            }catch(SQLException ex){
//            }
//        }
//        
//        return update;
//    }
//    

    private void openConn() {
        try {
            ResourceBundle rb = ResourceBundle.getBundle("sakila");
            this.dbUrl = rb.getString("database.url");
            this.dbUser = rb.getString("database.user");
            this.dbPassword = rb.getString("database.password");
            this.driverClassName = rb.getString("database.driver");
            Class.forName(driverClassName);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(ActorDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
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

    @Override
    public void insert() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
}
