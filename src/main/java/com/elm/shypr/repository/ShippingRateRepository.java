package com.elm.shypr.repository;

import com.elm.shypr.domain.ShippingRate;
import com.elm.shypr.domain.enumeration.DeliveryLocation;
import com.elm.shypr.domain.enumeration.WeightCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ShippingRateRepository extends JpaRepository<ShippingRate, Long> {

    @Query("select s from ShippingRate s where s.deliveryLocation = :deliveryLocation and s.weightCategory = :weightCategory and " +
            "s.cashOnDelivery = :cashOnDelivery")
    Set<ShippingRate> getShippingRatesByCriteria(@Param("deliveryLocation") DeliveryLocation deliveryLocation,
                                                 @Param("weightCategory") WeightCategory weightCategory,
                                                 @Param("cashOnDelivery") Boolean cashOnDelivery
                                                 );
}
