package com.elm.shypr.web.error;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ErrorMessage {
    private String errorCode;
    private String message;

    public ErrorMessage(String errorCode, String message) {
        this.errorCode = errorCode;
        this.message = message;
    }
}
