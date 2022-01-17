package server;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import java.util.List;

public class PointDAO {
    public static void persist(Point p) throws HibernateException {
        Transaction tx = null;
        try (Session session = HibernateUtil.getSession()) {
            tx = session.beginTransaction();
            session.save(p);
            tx.commit();
        } catch (Exception e) {
            if (tx != null) tx.rollback();
            throw e;
        }
    }
    public static List getByOwner(String id) {
        Session session = HibernateUtil.getSession();
        Query query = session.createQuery("select p from Point p where p.owner = :i");
        query.setParameter("i",id);
        return query.list();
    }
}
