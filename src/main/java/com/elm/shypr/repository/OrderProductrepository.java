package com.elm.shypr.repository;

import com.elm.shypr.domain.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductrepository extends JpaRepository<OrderProduct, Long> {
}
