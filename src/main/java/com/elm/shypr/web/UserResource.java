package com.elm.shypr.web;

import com.elm.shypr.dto.UserDto;
import com.elm.shypr.exception.ShyprException;
import com.elm.shypr.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserResource {

    private UserService userService;

    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity createUser(@RequestBody UserDto user) throws ShyprException {
        userService.createUser(user);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
