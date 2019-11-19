package com.elm.shypr.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

@Entity
@Table(name = "REGISTERED_ADDRESS")
@DiscriminatorValue("REGISTERED")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RegisteredAddress extends Address {

}
