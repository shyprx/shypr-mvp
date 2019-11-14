package com.elm.shypr.domain;
import com.elm.shypr.domain.enumeration.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Order.
 */
@Entity
@Table(name = "ORDERS")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private OrderStatus status;

    @OneToOne
    @JoinColumn(unique = true)
    private Payment payment;

    @OneToMany(mappedBy = "order")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Parcel> parcels = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties("orders")
    private Sender sender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public Order status(OrderStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Payment getPayment() {
        return payment;
    }

    public Order payment(Payment payment) {
        this.payment = payment;
        return this;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Set<Parcel> getParcels() {
        return parcels;
    }

    public Order parcels(Set<Parcel> parcels) {
        this.parcels = parcels;
        return this;
    }

    public Order addParcel(Parcel parcel) {
        this.parcels.add(parcel);
        parcel.setOrder(this);
        return this;
    }

    public Order removeParcel(Parcel parcel) {
        this.parcels.remove(parcel);
        parcel.setOrder(null);
        return this;
    }

    public void setParcels(Set<Parcel> parcels) {
        this.parcels = parcels;
    }

    public Sender getSender() {
        return sender;
    }

    public Order sender(Sender sender) {
        this.sender = sender;
        return this;
    }

    public void setSender(Sender sender) {
        this.sender = sender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
