package com.elm.shypr.dto.mapper;

import com.elm.shypr.domain.Carrier;
import com.elm.shypr.domain.Sender;
import com.elm.shypr.domain.User;
import com.elm.shypr.dto.UserDto;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    private ModelMapper modelMapper = new ModelMapper();

    public User toEntity(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }

    public UserDto toDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    public Carrier toCarrierEntity(UserDto userDto) {
        return modelMapper.map(userDto, Carrier.class);
    }

    public Sender toSenderEntity(UserDto userDto) {
        return modelMapper.map(userDto, Sender.class);
    }
}
