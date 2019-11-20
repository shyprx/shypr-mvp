package com.elm.shypr.service;

import com.elm.shypr.domain.Address;
import com.elm.shypr.domain.Order;
import com.elm.shypr.domain.OrderItem;
import com.elm.shypr.domain.Sender;
import com.elm.shypr.domain.enumeration.OrderStatus;
import com.elm.shypr.dto.OrderDto;
import com.elm.shypr.dto.mapper.OrderMapper;
import com.elm.shypr.exception.ErrorCodes;
import com.elm.shypr.exception.ShyprException;
import com.elm.shypr.repository.OrderRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderService {

    private OrderMapper orderMapper;
    private OrderRepository orderRepository;
    private UserService userService;

    public OrderService(OrderMapper orderMapper,
                        OrderRepository orderRepository,
                        UserService userService) {
        this.orderMapper = orderMapper;
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    public void placeOrder(OrderDto orderDto) throws ShyprException {
        Order order = orderMapper.toEntity(orderDto);
        order.setStatus(OrderStatus.CREATED);
        for (OrderItem orderItem : order.getOrderItems()) {
            orderItem.setOrder(order);
            if (orderItem.getFromAddress() == null || orderItem.getFromAddress().getCity() == null) {
                Address registeredAddress = ((Sender) userService.getCurrentUser()).getRegisteredAddress();
                if (registeredAddress == null) {
                    throw new ShyprException(ErrorCodes.FROM_ADDRESS_MISSING, "From address is missing in one of the packages");
                }
                orderItem.setFromAddress(registeredAddress);
            }
        }

        orderRepository.save(order);
    }
}
