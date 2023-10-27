package com.jobtracker.dao;

import com.jobtracker.entity.User;

import java.util.Optional;

public interface UserDao {
    Optional<User> findByEmail(final String email);
    void save(final User user);
}
