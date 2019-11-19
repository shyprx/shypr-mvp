package com.elm.shypr.repository;

import com.elm.shypr.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    User findOneByUsername(String username);

    User findOneByEmail(String email);

    User findOneByMobileNo(String mobileNo);
}
