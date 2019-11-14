package com.elm.shypr.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Parcel.
 */
@Entity
@Table(name = "parcel")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Parcel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "weight")
    private Double weight;

    @Column(name = "length")
    private Double length;

    @Column(name = "width")
    private Double width;

    @Column(name = "height")
    private Double height;

    @ManyToOne
    @JoinColumn(name = "ORDER_ID")
    private Order order;

    @OneToOne
    @JoinColumn(unique = true)
    private Address fromAddress;

    @OneToOne
    @JoinColumn(unique = true)
    private Address toAddress;

    @OneToOne
    @JoinColumn(unique = true)
    private ShippingLabel label;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getWeight() {
        return weight;
    }

    public Parcel weight(Double weight) {
        this.weight = weight;
        return this;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public Double getLength() {
        return length;
    }

    public Parcel length(Double length) {
        this.length = length;
        return this;
    }

    public void setLength(Double length) {
        this.length = length;
    }

    public Double getWidth() {
        return width;
    }

    public Parcel width(Double width) {
        this.width = width;
        return this;
    }

    public void setWidth(Double width) {
        this.width = width;
    }

    public Double getHeight() {
        return height;
    }

    public Parcel height(Double height) {
        this.height = height;
        return this;
    }

    public void setHeight(Double height) {
        this.height = height;
    }

    public Order getOrder() {
        return order;
    }

    public Parcel order(Order order) {
        this.order = order;
        return this;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Address getFromAddress() {
        return fromAddress;
    }

    public Parcel fromAddress(Address address) {
        this.fromAddress = address;
        return this;
    }

    public void setFromAddress(Address address) {
        this.fromAddress = address;
    }

    public Address getToAddress() {
        return toAddress;
    }

    public Parcel toAddress(Address address) {
        this.toAddress = address;
        return this;
    }

    public void setToAddress(Address address) {
        this.toAddress = address;
    }

    public ShippingLabel getLabel() {
        return label;
    }

    public Parcel label(ShippingLabel shippingLabel) {
        this.label = shippingLabel;
        return this;
    }

    public void setLabel(ShippingLabel shippingLabel) {
        this.label = shippingLabel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Parcel)) {
            return false;
        }
        return id != null && id.equals(((Parcel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Parcel{" +
            "id=" + getId() +
            ", weight=" + getWeight() +
            ", length=" + getLength() +
            ", width=" + getWidth() +
            ", height=" + getHeight() +
            "}";
    }
}
