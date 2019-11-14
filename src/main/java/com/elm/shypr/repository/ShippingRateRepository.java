package com.elm.shypr.repository;

import com.elm.shypr.domain.ShippingRate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ShippingRateRepository extends JpaRepository<ShippingRate, Long> {

    //Set<ShippingRate> getShippingRatesByCriteria();
}
