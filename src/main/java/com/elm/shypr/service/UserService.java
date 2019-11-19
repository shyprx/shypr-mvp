package com.elm.shypr.service;

import com.elm.shypr.config.security.UserDetailsImpl;
import com.elm.shypr.domain.User;
import com.elm.shypr.domain.enumeration.UserType;
import com.elm.shypr.dto.UserDto;
import com.elm.shypr.dto.mapper.UserMapper;
import com.elm.shypr.exception.ErrorCodes;
import com.elm.shypr.exception.ShyprException;
import com.elm.shypr.repository.CarrierRepository;
import com.elm.shypr.repository.SenderRepository;
import com.elm.shypr.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;
    private CarrierRepository carrierRepository;
    private SenderRepository senderRepository;
    private UserMapper userMapper;
    private PasswordEncoder passwordEncoder;

    public UserService(UserMapper userMapper,
                       UserRepository userRepository,
                       CarrierRepository carrierRepository,
                       SenderRepository senderRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.carrierRepository = carrierRepository;
        this.senderRepository = senderRepository;
    }

    public User getCurrentUser() {
        return userRepository.findByUsername(getCurrentUsername());
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((UserDetails)authentication.getPrincipal()).getUsername();
    }

    public void createUser(UserDto userDto) throws ShyprException {
        checkUserBeforeRegistration(userDto);
        User user = userMapper.toEntity(userDto);
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        if(userDto.getUserType().equals(UserType.CARRIER)) {
            carrierRepository.save(userMapper.toCarrierEntity(userDto));
        } else if(userDto.getUserType().equals(UserType.SENDER)) {
            senderRepository.save(userMapper.toSenderEntity(userDto));
        }
    }

    private void checkUserBeforeRegistration(UserDto userDto) throws ShyprException {
        User user = userRepository.findOneByUsername(userDto.getUsername());
        if(user != null) {
            throw new ShyprException(ErrorCodes.USERNAME_ALREADY_USED, "Username is already used");
        }

        user = userRepository.findOneByEmail(userDto.getEmail());
        if(user != null) {
            throw new ShyprException(ErrorCodes.EMAIL_ALREADY_USED, "Email is already used");
        }

        user = userRepository.findOneByMobileNo(userDto.getMobileNo());
        if(user != null) {
            throw new ShyprException(ErrorCodes.MOBILE_ALREADY_USED, "Mobile is already used");
        }
    }
}
