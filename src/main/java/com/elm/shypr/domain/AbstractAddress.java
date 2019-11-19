package com.elm.shypr.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@MappedSuperclass
@Getter @Setter @NoArgsConstructor
public abstract class AbstractAddress implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "person_name")
    private String personName;

    @Column(name = "description")
    private String description;

    @Column(name = "mobile_no")
    private String mobileNo;

    @ManyToOne
    private City city;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AbstractAddress that = (AbstractAddress) o;
        return Objects.equals(personName, that.personName) &&
                Objects.equals(description, that.description) &&
                Objects.equals(mobileNo, that.mobileNo) &&
                Objects.equals(city, that.city);
    }

    @Override
    public int hashCode() {
        return Objects.hash(personName, description, mobileNo, city);
    }
}
