package com.elm.shypr.domain;
import com.elm.shypr.domain.enumeration.DeliveryLocation;
import com.elm.shypr.domain.enumeration.WeightCategory;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A ShippingRate.
 */
@Entity
@Table(name = "shipping_rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter @Setter @NoArgsConstructor
public class ShippingRate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "DELIVERY_LOCATION")
    @Enumerated(EnumType.STRING)
    private DeliveryLocation deliveryLocation;

    @Column(name = "WEIGHT_CATEGORY")
    @Enumerated(EnumType.STRING)
    private WeightCategory weightCategory;

    @Column(name = "CASH_ON_DELIVERY")
    private Boolean cashOnDelivery;

    @Column(name = "PRICE", precision = 21, scale = 2)
    private BigDecimal price;

    @ManyToOne
    @JoinColumn(name = "CARRIER_ID")
    private Carrier carrier;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShippingRate that = (ShippingRate) o;
        return deliveryLocation == that.deliveryLocation &&
                weightCategory == that.weightCategory &&
                cashOnDelivery.equals(that.cashOnDelivery) &&
                price.equals(that.price) &&
                carrier.equals(that.carrier);
    }

    @Override
    public int hashCode() {
        return Objects.hash(deliveryLocation, weightCategory, cashOnDelivery, price, carrier);
    }
}
