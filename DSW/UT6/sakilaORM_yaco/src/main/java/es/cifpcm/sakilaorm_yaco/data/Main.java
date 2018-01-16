/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package es.cifpcm.sakilaorm_yaco.data;

import es.cifpcm.sakilaorm_yaco.Actor;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.HibernateException;
import org.hibernate.Session;

/**
 *
 * @author Yaco
 */
public class Main {
    private List<Actor> fetchActors(){
        List<Actor> aList = new ArrayList<>();
        Session session = HibernateUtil.getSessionFactory().openSession();
        try {
            session.getTransaction();
            aList.addAll(session.createCriteria(Actor.class).list());
            session.getTransaction().commit();
        } catch (HibernateException ex) {
            session.getTransaction().rollback();
        }finally{
            session.close();
        }
        return aList;
    }
}
