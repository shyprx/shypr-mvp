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
import java.util.HashMap;
import java.util.Set;
import java.util.stream.Collectors;

import java.io.InputStream;
import java.text.ParseException;
import net.sf.jasperreports.engine.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

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


    public ResponseEntity<?> generateBarcode(String awbNumber)
            throws JRException, ParseException {
        InputStream template = getClass().getResourceAsStream("/templates/reports/airWaybillbarcode.jrxml");
        JasperReport report = JasperCompileManager.compileReport(template);

            HashMap<String, Object> map = new HashMap<>();
            map.put("Barcode", "123-11111111");
            map.put("MasterAWBBarcode", "123-11111111");
            map.put("number", "pkg Numer");
            map.put("ImagesDir", this.getClass().getResource("/templates/reports/images/").toString());
            map.put("destnation", "dest");
            map.put("AirportName", "airport");
            map.put("Origin", "origin");
            map.put("IssuedBy", "issuedby");
            map.put("Packages", "noOfpkgs");
            map.put("Total", "total");
            map.put("Weight", 5.0);
            map.put("PkgWeight", 0.0);
            map.put("Chargeable", 2.0);
            map.put("Description", "desc");
            map.put("Dimension", "dimen");
            map.put("Note", "note");
            map.put("From",  "from");
            map.put("TO","to");
        JasperPrint jasperPrint = JasperFillManager.fillReport(report, map, new JREmptyDataSource());
        HttpHeaders headers = new HttpHeaders();
        headers.add("content-disposition", "attachment; filename=" + "ShipmentBarcode.pdf");
        return ResponseEntity.ok().headers(headers).body(JasperExportManager.exportReportToPdf(jasperPrint));
    }
}
