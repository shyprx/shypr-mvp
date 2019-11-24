package com.elm.shypr.repository;

import com.elm.shypr.domain.ShippingLabel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingLabelRepository extends JpaRepository<ShippingLabel, Long> {
}
