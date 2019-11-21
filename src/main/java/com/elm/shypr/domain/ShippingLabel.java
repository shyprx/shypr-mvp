package com.elm.shypr.domain;

import com.elm.shypr.domain.enumeration.LabelStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;

/**
 * A ShippingLabel.
 */
@Entity
@Table(name = "shipping_label")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter @Setter @NoArgsConstructor
public class ShippingLabel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tracking_number", unique = true)
    private String trackingNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LabelStatus status;

    @ManyToOne
    @JoinColumn(name = "CARRIER_ID")
    private Carrier carrier;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ORDER_ITEM_ID")
    private OrderItem orderItem;
}
