package com.elm.shypr.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Objects;

@Entity @Table(name = "order_item")
@Getter @Setter
public class OrderItem extends AbstractAuditingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parcel_id")
    private Parcel parcel;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "from_address_id")
    private Address fromAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "to_address_id")
    private Address toAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_rate_id")
    private ShippingRate shippingRate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return Objects.equals(id, orderItem.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
