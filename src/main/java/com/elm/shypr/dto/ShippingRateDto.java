package com.elm.shypr.dto;

import com.elm.shypr.domain.enumeration.DeliveryLocation;
import com.elm.shypr.domain.enumeration.DeliveryTime;
import com.elm.shypr.domain.enumeration.WeightCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor
public class ShippingRateDto {
    private Long id;
    private DeliveryLocation deliveryLocation;
    private WeightCategory weightCategory;
    private Boolean cashOnDelivery;
    private DeliveryTime deliveryTime;
    private BigDecimal price;
    private Long carrierId;
}
