package com.elm.shypr.web;

import com.elm.shypr.domain.User;
import com.elm.shypr.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationResource {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/authenticate")
    public ResponseEntity<User> authenticate() {
        String username = ((UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        User user = userRepository.findByUsername(username);

        return ResponseEntity.ok(user);
    }
}
