package com.elm.shypr.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A ShippingRate.
 */
@Entity
@Table(name = "shipping_rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ShippingRate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "price_inside_city", precision = 21, scale = 2)
    private BigDecimal priceInsideCity;

    @Column(name = "price_outside_city", precision = 21, scale = 2)
    private BigDecimal priceOutsideCity;

    @OneToOne(mappedBy = "shippingRate")
    @JsonIgnore
    private Carrier carrier;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPriceInsideCity() {
        return priceInsideCity;
    }

    public ShippingRate priceInsideCity(BigDecimal priceInsideCity) {
        this.priceInsideCity = priceInsideCity;
        return this;
    }

    public void setPriceInsideCity(BigDecimal priceInsideCity) {
        this.priceInsideCity = priceInsideCity;
    }

    public BigDecimal getPriceOutsideCity() {
        return priceOutsideCity;
    }

    public ShippingRate priceOutsideCity(BigDecimal priceOutsideCity) {
        this.priceOutsideCity = priceOutsideCity;
        return this;
    }

    public void setPriceOutsideCity(BigDecimal priceOutsideCity) {
        this.priceOutsideCity = priceOutsideCity;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public ShippingRate carrier(Carrier carrier) {
        this.carrier = carrier;
        return this;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShippingRate)) {
            return false;
        }
        return id != null && id.equals(((ShippingRate) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ShippingRate{" +
            "id=" + getId() +
            ", priceInsideCity=" + getPriceInsideCity() +
            ", priceOutsideCity=" + getPriceOutsideCity() +
            "}";
    }
}
