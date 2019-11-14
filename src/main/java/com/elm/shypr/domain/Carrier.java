package com.elm.shypr.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Carrier.
 */
@Entity
@Table(name = "carrier")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@DiscriminatorValue("CARRIER")
public class Carrier extends User implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(name = "name")
    private String name;

    @OneToOne
    @JoinColumn(unique = true)
    private ShippingRate shippingRate;

    @OneToMany(mappedBy = "carrier")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ShippingLabel> labels = new HashSet<>();

    public String getName() {
        return name;
    }

    public Carrier name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ShippingRate getShippingRate() {
        return shippingRate;
    }

    public Carrier shippingRate(ShippingRate shippingRate) {
        this.shippingRate = shippingRate;
        return this;
    }

    public void setShippingRate(ShippingRate shippingRate) {
        this.shippingRate = shippingRate;
    }

    public Set<ShippingLabel> getLabels() {
        return labels;
    }

    public Carrier labels(Set<ShippingLabel> shippingLabels) {
        this.labels = shippingLabels;
        return this;
    }

    public Carrier addLabels(ShippingLabel shippingLabel) {
        this.labels.add(shippingLabel);
        shippingLabel.setCarrier(this);
        return this;
    }

    public Carrier removeLabels(ShippingLabel shippingLabel) {
        this.labels.remove(shippingLabel);
        shippingLabel.setCarrier(null);
        return this;
    }

    public void setLabels(Set<ShippingLabel> shippingLabels) {
        this.labels = shippingLabels;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carrier)) {
            return false;
        }
        return getId() != null && getId().equals(((Carrier) o).getId());
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Carrier{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
