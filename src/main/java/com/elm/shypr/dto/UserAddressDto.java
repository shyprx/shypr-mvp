package com.elm.shypr.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter @NoArgsConstructor
public class UserAddressDto {
    @NotNull
    private UserDto user;
    @NotNull
    private AddressDto shipFromAddress;
}
