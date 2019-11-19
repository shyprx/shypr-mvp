package com.elm.shypr.domain;

import com.elm.shypr.domain.enumeration.DeliveryLocation;
import com.elm.shypr.domain.enumeration.DeliveryTime;
import com.elm.shypr.domain.enumeration.WeightCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A Parcel.
 */
@Entity
@Table(name = "parcel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter @Setter @NoArgsConstructor
public class Parcel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "weight_category")
    private WeightCategory weightCategory;

    @Column(name = "DELIVERY_LOCATION")
    @Enumerated(EnumType.STRING)
    private DeliveryLocation deliveryLocation;

    @Column(name = "CASH_ON_DELIVERY")
    private Boolean cashOnDelivery;

    @Column(name = "DELIVERY_TIME")
    @Enumerated(EnumType.STRING)
    private DeliveryTime deliveryTime;

    @Column(name = "parcel_value")
    private BigDecimal parcelValue;
}
