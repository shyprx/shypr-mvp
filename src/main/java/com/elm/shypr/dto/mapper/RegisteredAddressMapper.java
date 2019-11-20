package com.elm.shypr.dto.mapper;

import com.elm.shypr.domain.RegisteredAddress;
import com.elm.shypr.dto.AddressDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class RegisteredAddressMapper {
    private ModelMapper modelMapper = new ModelMapper();

    public RegisteredAddress toEntity(AddressDto addressDto) {
        if(addressDto == null) return null;
        return modelMapper.map(addressDto, RegisteredAddress.class);
    }

    public AddressDto toDto(RegisteredAddress address) {
        if(address == null) return null;
        return modelMapper.map(address, AddressDto.class);
    }
}
