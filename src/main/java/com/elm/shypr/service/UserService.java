package com.elm.shypr.service;

import com.elm.shypr.domain.Carrier;
import com.elm.shypr.domain.RegisteredAddress;
import com.elm.shypr.domain.Sender;
import com.elm.shypr.domain.User;
import com.elm.shypr.domain.enumeration.UserType;
import com.elm.shypr.dto.UserAddressDto;
import com.elm.shypr.dto.UserDto;
import com.elm.shypr.dto.mapper.RegisteredAddressMapper;
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
    private RegisteredAddressMapper registeredAddressMapper;

    public UserService(UserRepository userRepository,
                       CarrierRepository carrierRepository,
                       SenderRepository senderRepository,
                       UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       RegisteredAddressMapper registeredAddressMapper) {
        this.userRepository = userRepository;
        this.carrierRepository = carrierRepository;
        this.senderRepository = senderRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.registeredAddressMapper = registeredAddressMapper;
    }

    public User getCurrentUser() {
        return userRepository.findByUsername(getCurrentUsername());
    }

    private String getCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ((UserDetails)authentication.getPrincipal()).getUsername();
    }

    public void createUser(UserAddressDto userAddressDto) throws ShyprException {
        checkUserBeforeRegistration(userAddressDto.getUser());
        RegisteredAddress registeredAddress = registeredAddressMapper.toEntity(userAddressDto.getShipFromAddress());
        String encodedPassword = passwordEncoder.encode(userAddressDto.getUser().getPassword());
        if(userAddressDto.getUser().getUserType().equals(UserType.CARRIER)) {
            Carrier carrier = userMapper.toCarrierEntity(userAddressDto.getUser());
            carrier.setPassword(encodedPassword);
            carrierRepository.save(carrier);
        } else if(userAddressDto.getUser().getUserType().equals(UserType.SENDER)) {
            Sender sender = userMapper.toSenderEntity(userAddressDto.getUser());
            sender.setPassword(encodedPassword);
            if(registeredAddress != null && registeredAddress.getCity() != null) {
                sender.setRegisteredAddress(registeredAddress);
            }
            senderRepository.save(sender);
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
