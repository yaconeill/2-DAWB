/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilajsf_yaco.web.data;

import es.cifpcm.sakilajsf_yaco.web.bean.ActorBean;
import es.cifpcm.sakilajsf_yaco.web.model.Actor;
import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Yaco
 */
public class ActorDaoImpl implements Serializable {

    private List<Actor> selectAll;
    private String dbUrl;
    private String dbUser;
    private String dbPassword;
    private String driverClassName;

    public ActorDaoImpl() {
        selectAll = new ArrayList<>();
        Connection conexion = null;
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

        try {
            conexion = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            // Se crea un Statement, para realizar la consulta
            // Se realiza la consulta. Los resultados se guardan en el ResultSet rs
            String cadena = "select * from actor";
            PreparedStatement s = conexion.prepareStatement(cadena);
            ResultSet rs = s.executeQuery(cadena);

            // Se recorre el ResultSet, mostrando por pantalla los resultados.
            while (rs.next()) {
                Actor newActor = new Actor(rs.getShort(1), rs.getString(2), rs.getString(3), rs.getTimestamp(4));
                selectAll.add(newActor);
            }
        } catch (SQLException e) {
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

    public void deleteActor(Actor actor) {
        selectAll.remove(actor);
    }

    public List<Actor> selectAll() {
        return selectAll;
    }

    public Actor getActor(int actorId) {
        return selectAll.get(actorId);
    }

    public void updateActor(Actor actor) {
        selectAll.get(actor.getActorId()).setFirstName(actor.getFirstName());
    }

    public Actor insert(Actor actor) {
        Connection conn = null;
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
        try {
            conn = DriverManager.getConnection(dbUrl, dbUser, dbPassword);
            String query = "insert into actor (first_name, last_name) values(?,?)";

            try (PreparedStatement pstmt = conn.prepareStatement(query, Statement.RETURN_GENERATED_KEYS)) {
                // Se crea un Statement, para realizar la consulta
                // Se realiza la consulta. Los resultados se guardan en el ResultSet rs

                pstmt.setString(1, actor.getFirstName());
                pstmt.setString(2, actor.getLastName());

                pstmt.executeUpdate();
                ResultSet rs = pstmt.getGeneratedKeys();

                while (rs.next()) {
                    Short id = rs.getShort(1);
                    actor.setActorId((int) id);
                }
            }
        } catch (SQLException e) {
            actor.setActorId(-1);
            System.out.println(e.getMessage());
        } finally { // Se cierra la conexión con la base de datos.
            try {
                if (conn != null) {
                    conn.close();
                }
            } catch (SQLException ex) {
                System.out.println(ex.getMessage());
            }
        }
        return actor;
    }
}
