package com.elm.shypr.dto.mapper;

import com.elm.shypr.domain.Order;
import com.elm.shypr.domain.Sender;
import com.elm.shypr.dto.OrderDto;
import com.elm.shypr.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {

    private ModelMapper modelMapper = new ModelMapper();
    private UserService userService;

    public OrderMapper(UserService userService) {
        this.userService = userService;
    }

    public Order toEntity(OrderDto orderDto) {
        Order order = modelMapper.map(orderDto, Order.class);
        order.setSender(new Sender(userService.getCurrentUser().getId()));
        return order;
    }

    public OrderDto toDto(Order order) {
        return modelMapper.map(order, OrderDto.class);
    }
}
