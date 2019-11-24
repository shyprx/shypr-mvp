package com.elm.shypr.service;

import com.elm.shypr.repository.ShippingLabelRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ShippingLabelService {
    private ShippingLabelRepository shippingLabelRepository;

    public ShippingLabelService(ShippingLabelRepository shippingLabelRepository) {
        this.shippingLabelRepository = shippingLabelRepository;
    }


    public void printLabel(Long orderItemId) {

    }
}
