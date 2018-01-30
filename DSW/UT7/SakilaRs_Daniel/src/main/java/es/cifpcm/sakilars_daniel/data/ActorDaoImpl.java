package es.cifpcm.sakilars_daniel.data;

import es.cifpcm.sakilars_daniel.pojos.Actor;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.Transaction;

/**
 *
 * @author daniel
 */
public class ActorDaoImpl implements ActorDao {

    @Override
    public List<Actor> selectAll() {
        List<Actor> aList = new ArrayList<>();
        Session session = NewHibernateUtil.getSessionFactory().openSession();
        try {
            session.beginTransaction();
            aList = session.createQuery("FROM Actor").list();
            session.getTransaction().commit();
        } catch (Exception e) {
            session.getTransaction().rollback();
        } finally {
            session.close();
        }
        return aList;
    }

    @Override
    public Actor insert(Actor actor) {
        Session session = NewHibernateUtil.getSessionFactory().openSession();
        try {
            Transaction tx = session.beginTransaction();
            session.save(actor);
            tx.commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            session.close();
        }
        return actor;
    }
/*
    public static void main(String args[]) {
        Session sess = null;
        try {
            sess = HibernateUtil.currentSession();
            Transaction tx = sess.beginTransaction();
            Studentdetail student = new Studentdetail();
            student.setStudentName("Amardeep Patel");
            student.setStudentAddress("rohini,sec-2, delhi-85");
            student.setEmail("amar@rediffmail.com");
            sess.save(student);
            System.out.println("Successfully data insert in database");
            tx.commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        } finally {
            sess.close();
        }
    }
*/
}
