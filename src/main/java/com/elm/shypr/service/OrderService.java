package com.elm.shypr.service;

import com.elm.shypr.domain.Order;
import com.elm.shypr.domain.enumeration.OrderStatus;
import com.elm.shypr.dto.OrderDto;
import com.elm.shypr.dto.mapper.OrderMapper;
import com.elm.shypr.repository.OrderRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class OrderService {

    private OrderMapper orderMapper;
    private OrderRepository orderRepository;

    public OrderService(OrderMapper orderMapper, OrderRepository orderRepository) {
        this.orderMapper = orderMapper;
        this.orderRepository = orderRepository;
    }

    public void placeOrder(OrderDto orderDto) {
        Order order = orderMapper.toEntity(orderDto);
        order.setStatus(OrderStatus.CREATED);
        orderRepository.save(order);
    }
}
