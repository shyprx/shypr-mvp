package com.elm.shypr.dto;

import com.elm.shypr.domain.OrderItem;
import com.elm.shypr.domain.Sender;
import com.elm.shypr.domain.enumeration.OrderStatus;
import com.elm.shypr.domain.enumeration.PaymentType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter @Setter @NoArgsConstructor
public class OrderDto implements Serializable {

    private Long id;
    private OrderStatus status;
    private BigDecimal totalPrice;
    private PaymentType paymentType;
    private String senderName;
    private Set<OrderItemDto> orderItems = new HashSet<>();
}
