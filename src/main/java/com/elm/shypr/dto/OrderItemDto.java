package com.elm.shypr.dto;

import com.elm.shypr.domain.Address;
import com.elm.shypr.domain.Parcel;
import com.elm.shypr.domain.ShippingRate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter @NoArgsConstructor
public class OrderItemDto implements Serializable {

    private Long id;
    private ParcelDto parcel;
    private AddressDto fromAddress;
    private AddressDto toAddress;
    private ShippingRateDto shippingRate;
}
