package com.elm.shypr.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter @Setter @NoArgsConstructor
public class CarrierDto implements Serializable {
    private Long id;
    private String name;
}
