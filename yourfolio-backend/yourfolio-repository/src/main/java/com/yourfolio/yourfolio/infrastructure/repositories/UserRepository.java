package com.yourfolio.yourfolio.infrastructure.repositories;

import com.yourfolio.yourfolio.infrastructure.dbentities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {
}