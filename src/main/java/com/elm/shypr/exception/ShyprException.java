package com.elm.shypr.exception;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ShyprException extends Exception {
    private String errorCode;
    private String errorMessage;

    public ShyprException(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
