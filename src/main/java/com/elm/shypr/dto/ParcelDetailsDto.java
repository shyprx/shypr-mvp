package com.elm.shypr.dto;

import com.elm.shypr.domain.enumeration.WeightCategory;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Getter @Setter @NoArgsConstructor
public class ParcelDetailsDto {

    @NotNull
    private Long fromCityId;

    @NotNull
    private Long toCityId;

    @NotNull
    private WeightCategory weightCategory;

    @NotNull
    private Boolean cashOnDelivery;

    private BigDecimal parcelValue;
}
