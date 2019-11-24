package com.elm.shypr.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

/**
 * A Address.
 */
@Entity
@Table(name = "ADDRESS")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "ADDRESS_TYPE")
@DiscriminatorValue("NOT_REGISTERED")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Getter @Setter @NoArgsConstructor
public class Address {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "description")
    private String description;

    @Column(name = "mobile_no")
    private String mobileNo;

    @ManyToOne
    private City city;
}
