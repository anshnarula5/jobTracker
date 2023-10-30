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
            // Set the user ID before saving the application
            entityManager.persist(application);
            return application;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<Application> getAllApplications(int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE userId = :userId", Application.class);
        return query.setParameter("userId", userId).getResultList();
    }

    @Override
    public void deleteApplicationById(int id, int userId) {
        System.out.println("Deleting application with id : " + id);
        Query query = entityManager.createNativeQuery("DELETE FROM Application where id = :id");
        query.setParameter("id", id).executeUpdate();
        System.out.println("Deletion successful");
    }

    @Override
    public List<Application> getAllReferralRequestedApplications(int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE currentStatus = 'referral_requested' AND userId = :userId ORDER BY currentStatusDate DESC", Application.class);
        return query.setParameter("userId", userId).getResultList();
    }

    @Override
    public List<Application> getAllReferredApplications(int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE currentStatus = 'referred'  AND userId = :userId ORDER BY currentStatusDate DESC", Application.class);
        return query.setParameter("userId", userId).getResultList();
    }

    @Override
    public List<Application> getAllAppliedApplications(int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE currentStatus = 'applied' AND userId = :userId ORDER BY currentStatusDate DESC", Application.class);
        return query.setParameter("userId", userId).getResultList();
    }

    @Override
    public List<Application> getAllColdApplications(int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE referred = false AND applied = false AND referralRequested = false AND interview = false  AND userId = :userId" , Application.class);
        return query.setParameter("userId", userId).getResultList();
    }

    @Override
    public List<Application> getAllInterviewApplications(int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE currentStatus = 'interview' AND userId = :userId ORDER BY currentStatusDate DESC", Application.class);
        return query.setParameter("userId", userId).getResultList();
    }

    @Override
    public void markReferralRequested(int id, Date date, int userId) {
        Query query = entityManager.createQuery("UPDATE Application SET referralRequested = true, referralRequestDate = :date, " +
                "currentStatus = 'referral_requested', currentStatusDate = :date WHERE id = :id AND userId = :userId");
        query.setParameter("id", id).setParameter("date", date).setParameter("userId", userId).executeUpdate();
    }

    @Override
    public void markReferred(int id, Date date, int userId) {
        Query query = entityManager.createQuery("UPDATE Application SET referred = true, referredDate = :date, " +
                "currentStatus = 'referred', currentStatusDate = :date WHERE id = :id AND userId = :userId");
        query.setParameter("id", id).setParameter("date", date).setParameter("userId", userId).executeUpdate();
    }

    @Override
    public void markApplied(int id, Date date, int userId) {
        Query query = entityManager.createQuery("UPDATE Application SET applied = true, appliedDate = :date, " +
                "currentStatus = 'applied', currentStatusDate = :date WHERE id = :id AND userId = :userId");
        query.setParameter("id", id).setParameter("date", date).setParameter("userId", userId).executeUpdate();
    }

    @Override
    public void markInterview(int id, Date date, int userId) {
        Query query = entityManager.createQuery("UPDATE Application SET interview = true, interviewDate = :date, " +
                "currentStatus = 'interview', currentStatusDate = :date WHERE id = :id AND userId = :userId");
        query.setParameter("id", id).setParameter("date", date).setParameter("userId", userId).executeUpdate();
    }

    @Override
    public Boolean idExists(int id, int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE id = :id AND userId = :userId", Application.class);
        List<Application> test = query.setParameter("id", id).setParameter("userId", userId).getResultList();
        return !test.isEmpty();
    }

    @Override
    public Application getApplicationById(int id, int userId) {
        TypedQuery<Application> query = entityManager.createQuery("FROM Application WHERE id = :id AND userId = :userId", Application.class);
        List<Application> applications = query.setParameter("id", id).setParameter("userId", userId).getResultList();
        return applications.isEmpty() ? null : applications.get(0);
    }

    @Override
    public ReferralDataResponse getReferralData(int userId) {
        String jpql = "SELECT NEW com.example.ReferralDataResponse(e.companyName, " +
                "SUM(CASE WHEN e.referralRequested = true THEN 1 ELSE 0 END), " +
                "SUM(CASE WHEN e.referred = true THEN 1 ELSE 0 END)) " +
                "FROM ApplicationEntity e WHERE e.userId = :userId GROUP BY e.companyName";

        Query query = entityManager.createQuery(jpql);
        query.setParameter("userId", userId);
        return (ReferralDataResponse) query.getSingleResult();
    }
}
