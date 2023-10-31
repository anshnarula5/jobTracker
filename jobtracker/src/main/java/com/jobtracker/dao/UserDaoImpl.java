package com.jobtracker.dao;

import com.jobtracker.entity.Application;
import com.jobtracker.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserDaoImpl implements UserDao{
    private final EntityManager entityManager;

    @Autowired
    public UserDaoImpl(final EntityManager entityManager){
        this.entityManager = entityManager;
    }
    @Override
    public Optional<User> findByEmail(final String email) {
        System.out.println("Finding user with email id : " + email);
        try {
            TypedQuery<User> query = entityManager.createQuery("FROM User WHERE email = :email", User.class);
            User user = query.setParameter("email", email).getSingleResult();
            System.out.println("Inside dao impl");
            return Optional.of(user);
        } catch (NoResultException e) {
            System.out.println("User not found for email: " + email);
            return Optional.empty();
        }
    }

    @Override
    public void save(User user) {
        entityManager.persist(user);
    }
}
