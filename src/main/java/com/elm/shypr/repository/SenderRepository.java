package com.elm.shypr.repository;

import com.elm.shypr.domain.Sender;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SenderRepository extends JpaRepository<Sender, Long> {
}
