package com.elm.shypr.dto;

import com.elm.shypr.domain.enumeration.DeliveryLocation;
import com.elm.shypr.domain.enumeration.DeliveryTime;
import com.elm.shypr.domain.enumeration.WeightCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor
public class ParcelDto implements Serializable {
    private WeightCategory weightCategory;
    private DeliveryLocation deliveryLocation;
    private Boolean cashOnDelivery;
    private DeliveryTime deliveryTime;
    private BigDecimal parcelValue;
}
