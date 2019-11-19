package com.elm.shypr.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter @NoArgsConstructor
public class AddressDto implements Serializable {
    private Long id;
    private String personName;
    private String description;
    private String mobileNo;
    private Long cityId;
}
