package com.elm.shypr.web;

import com.elm.shypr.dto.ParcelDetailsDto;
import com.elm.shypr.dto.ShippingRateDto;
import com.elm.shypr.service.ShippingRateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/api/shipping-rates")
public class ShippingRateResource {

    private ShippingRateService shippingRateService;

    public ShippingRateResource(ShippingRateService shippingRateService) {
        this.shippingRateService = shippingRateService;
    }

    @GetMapping("/parcel-details")
    public ResponseEntity<Set<ShippingRateDto>> getShippingRatesByCriteria(@Valid ParcelDetailsDto parcelDetailsDto) {
        return ResponseEntity.ok(shippingRateService.getShippingRatesByCriteria(parcelDetailsDto));
    }
}
