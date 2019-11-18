package com.elm.shypr.web;

import com.elm.shypr.dto.ParcelDetailsDto;
import com.elm.shypr.dto.ShippingRateDto;
import com.elm.shypr.service.ShippingRateService;
import net.sf.jasperreports.engine.JRException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.text.ParseException;
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
    @RequestMapping(value ="/print-barcode",method = RequestMethod.GET, produces = {MediaType.APPLICATION_PDF_VALUE})
    public  ResponseEntity<?> getBarcode(@Param("aWBId") String aWBId) throws ParseException, JRException {
        return ResponseEntity.ok(shippingRateService.generateBarcode(aWBId));
    }
}
