package com.elm.shypr.web;

import com.elm.shypr.dto.OrderDto;
import com.elm.shypr.exception.ShyprException;
import com.elm.shypr.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderResource {

    private OrderService orderService;

    public OrderResource(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity placeOrder(@RequestBody OrderDto order) throws ShyprException {
        orderService.placeOrder(order);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
