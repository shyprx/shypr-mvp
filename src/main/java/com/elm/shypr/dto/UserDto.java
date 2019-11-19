package com.elm.shypr.dto;

import com.elm.shypr.domain.enumeration.UserType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class UserDto {
    private Long id;
    private String name;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String mobileNo;
    private UserType userType;
}
