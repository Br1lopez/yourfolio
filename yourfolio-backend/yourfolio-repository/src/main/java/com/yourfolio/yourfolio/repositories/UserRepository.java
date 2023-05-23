package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.dbentities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    public UserEntity findByEmail(String email);
}