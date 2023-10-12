package com.jobtracker.dao;

import com.jobtracker.entity.Application;
import com.jobtracker.entity.ReferralDataResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ApplicationDaoImpl implements ApplicationDao{

    private final EntityManager entityManager;
    @Autowired
    public ApplicationDaoImpl(EntityManager entityManager){
        this.entityManager = entityManager;
    }
    @Override
    public Application save(Application application) {
        try {
            System.out.println("Saving application into db : ");
            entityManager.persist(application);
            System.out.println("Application saved to db - dao : " + application.id);
            return application;
        } catch (Exception e){
            System.out.println("Exception : " + Arrays.toString(e.getStackTrace()));
            throw new RuntimeException(e);
        }
    }
    @Override
    public List<Application> getAllApplications() {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application", Application.class);
        return query.getResultList();
    }

    @Override
    public List<Application> getAllReferralRequestedApplications() {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE currentStatus = 'referral_requested' ORDER BY currentStatusDate DESC", Application.class);
        return query.getResultList();
    }

    @Override
    public List<Application> getAllReferredApplications() {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE currentStatus = 'referred' ORDER BY currentStatusDate DESC", Application.class);
        return query.getResultList();
    }

    @Override
    public List<Application> getAllAppliedApplications() {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE currentStatus = 'applied' ORDER BY currentStatusDate DESC", Application.class);
        return query.getResultList();
    }

    @Override
    public List<Application> getAllColdApplications() {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE referred = false AND applied = false AND referralRequested = false", Application.class);
        return query.getResultList();
    }
    @Override
    public void markReferralRequested(int id, Date date) {
        System.out.println("Inside Dao call");
        Query query =
                entityManager
                        .createQuery("UPDATE Application set referralRequested = true, referralRequestDate = :date, " +
                                "currentStatus = 'referral_requested', currentStatusDate = :date where id = :id");
        int updateCount = query.setParameter("id", id).setParameter("date", date).executeUpdate();
        System.out.println("Dao call complete with update count : " + updateCount);
    }
    @Override
    public void markReferred(int id, Date date) {
        System.out.println("Inside Dao call");
        Query query =
                entityManager
                        .createQuery("UPDATE Application set referred = true, referredDate = :date, " +
                                "currentStatus = 'referred', currentStatusDate = :date WHERE id = :id");
        int updateCount = query.setParameter("id", id).setParameter("date", date).executeUpdate();
        System.out.println("Dao call complete with update count : " + updateCount);
    }
    @Override
    public void markApplied(int id, Date date) {
        System.out.println("Inside Dao call");
        Query query =
                entityManager
                        .createQuery("UPDATE Application set applied = true, appliedDate = :date, " +
                                "currentStatus = 'applied', currentStatusDate = :date WHERE id = :id");
        int updateCount = query.setParameter("id", id).setParameter("date", date).executeUpdate();
        System.out.println("Dao call complete with update count : " + updateCount);
    }
    @Override
    public Boolean idExists(int id){
        System.out.println("Checking does the id exists" + id);
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE id = :id", Application.class);
        List<Application> test = query.setParameter("id", id).getResultList();
        return !test.isEmpty();
    }
    @Override
    public Application getApplicationById(int id) {
        return null;
    }

    @Override
    public ReferralDataResponse getReferralData() {
        String jpql = "SELECT NEW com.example.ReferralDataResponse(e.companyName, " +
                "SUM(CASE WHEN e.referralRequested = true THEN 1 ELSE 0 END), " +
                "SUM(CASE WHEN e.referred = true THEN 1 ELSE 0 END)) " +
                "FROM ApplicationEntity e " +
                "GROUP BY e.companyName";

        Query query = entityManager.createQuery(jpql);
        return (ReferralDataResponse) query.getSingleResult();
    }
}
