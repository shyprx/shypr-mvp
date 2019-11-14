package com.elm.shypr.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Sender.
 */
@Entity
@Table(name = "SENDER")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@DiscriminatorValue("SENDER")
public class Sender extends User {

    private static final long serialVersionUID = 1L;

    @Column(name = "name")
    private String name;

    public String getName() {
        return name;
    }

    public Sender name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sender)) {
            return false;
        }
        return getId() != null && getId().equals(((Sender) o).getId());
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Sender{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
