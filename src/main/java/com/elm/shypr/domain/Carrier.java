package com.elm.shypr.domain;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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
@Getter @Setter @NoArgsConstructor
public class Carrier extends User {

    private static final long serialVersionUID = 1L;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "carrier")
    private Set<ShippingRate> shippingRates;

    @OneToMany(mappedBy = "carrier")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<ShippingLabel> labels = new HashSet<>();
}
