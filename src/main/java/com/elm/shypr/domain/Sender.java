package com.elm.shypr.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

/**
 * A Sender.
 */
@Entity
@Table(name = "SENDER")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@DiscriminatorValue("SENDER")
@Getter @Setter @NoArgsConstructor
public class Sender extends User {

    private static final long serialVersionUID = 1L;

    @Column(name = "name")
    private String name;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "REGISTERED_ADDRESS_ID")
    private RegisteredAddress registeredAddress;

    public Sender(Long id) {
        super.setId(id);
    }
}
