package com.elm.shypr.domain;
import com.elm.shypr.domain.enumeration.LabelStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
public class ShippingLabel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "tracking_number")
    private String trackingNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private LabelStatus status;

    @ManyToOne
    @JsonIgnoreProperties("labels")
    private Carrier carrier;

    @OneToOne(mappedBy = "label")
    @JsonIgnore
    private Parcel parcel;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public ShippingLabel trackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
        return this;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public LabelStatus getStatus() {
        return status;
    }

    public ShippingLabel status(LabelStatus status) {
        this.status = status;
        return this;
    }

    public void setStatus(LabelStatus status) {
        this.status = status;
    }

    public Carrier getCarrier() {
        return carrier;
    }

    public ShippingLabel carrier(Carrier carrier) {
        this.carrier = carrier;
        return this;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }

    public Parcel getParcel() {
        return parcel;
    }

    public ShippingLabel parcel(Parcel parcel) {
        this.parcel = parcel;
        return this;
    }

    public void setParcel(Parcel parcel) {
        this.parcel = parcel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ShippingLabel)) {
            return false;
        }
        return id != null && id.equals(((ShippingLabel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ShippingLabel{" +
            "id=" + getId() +
            ", trackingNumber='" + getTrackingNumber() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
