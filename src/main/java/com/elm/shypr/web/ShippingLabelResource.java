package com.elm.shypr.web;

import com.elm.shypr.service.ShippingLabelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shipping-labels")
public class ShippingLabelResource {

    private ShippingLabelService shippingLabelService;

    public ShippingLabelResource(ShippingLabelService shippingLabelService) {
        this.shippingLabelService = shippingLabelService;
    }

    @RequestMapping("/print/order-items/{orderItemId}")
    public ResponseEntity<byte[]> printLabel(@PathVariable Long orderItemId) {
        shippingLabelService.printLabel(orderItemId);
        return null;
    }
}
