package com.elm.shypr.dto.mapper;

import com.elm.shypr.domain.Address;
import com.elm.shypr.dto.AddressDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class AddressMapper {
    private ModelMapper modelMapper = new ModelMapper();

    public Address toEntity(AddressDto addressDto) {
        return modelMapper.map(addressDto, Address.class);
    }

    public AddressDto toDto(Address address) {
        return modelMapper.map(address, AddressDto.class);
    }

}
