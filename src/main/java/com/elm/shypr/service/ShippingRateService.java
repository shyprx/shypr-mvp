package com.elm.shypr.service;

import com.elm.shypr.domain.ShippingRate;
import com.elm.shypr.domain.enumeration.DeliveryLocation;
import com.elm.shypr.dto.ParcelDetailsDto;
import com.elm.shypr.dto.ShippingRateDto;
import com.elm.shypr.repository.ShippingRateRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ShippingRateService {

    private ModelMapper modelMapper = new ModelMapper();

    private ShippingRateRepository shippingRateRepository;

    public ShippingRateService(ShippingRateRepository shippingRateRepository) {
        this.shippingRateRepository = shippingRateRepository;
    }

    public Set<ShippingRateDto> getShippingRatesByCriteria(ParcelDetailsDto parcelDetailsDto) {

        DeliveryLocation deliveryLocation = DeliveryLocation.OUTSIDE_CITY;
        if(parcelDetailsDto.getFromCityId().equals(parcelDetailsDto.getToCityId())) {
            deliveryLocation = DeliveryLocation.INSIDE_CITY;
        }

        Set<ShippingRate> shippingRates = shippingRateRepository.getShippingRatesByCriteria(deliveryLocation,
                                                          parcelDetailsDto.getWeightCategory(),
                                                          parcelDetailsDto.getCashOnDelivery()
                                                          );

        Set<ShippingRateDto> result = shippingRates.stream().map(e -> modelMapper.map(e, ShippingRateDto.class)).collect(Collectors.toSet());

        return result;
    }
}
