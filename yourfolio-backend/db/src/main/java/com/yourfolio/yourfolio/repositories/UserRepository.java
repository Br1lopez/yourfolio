package com.yourfolio.yourfolio.repositories;

import com.yourfolio.yourfolio.daos.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}