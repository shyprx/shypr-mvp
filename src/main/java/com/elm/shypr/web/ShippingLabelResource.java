package com.elm.shypr.web;

import com.elm.shypr.service.ShippingLabelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shipping-labels")
public class ShippingLabelResource {

    private ShippingLabelService shippingLabelService;

    public ShippingLabelResource(ShippingLabelService shippingLabelService) {
        this.shippingLabelService = shippingLabelService;
    }

    public ResponseEntity<byte[]> printLabel() {
        shippingLabelService.printLabel();
    }
}
