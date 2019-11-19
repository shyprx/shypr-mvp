package com.elm.shypr.web.error;

import com.elm.shypr.exception.ShyprException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionTranslator {

    @ExceptionHandler(ShyprException.class)
    public ResponseEntity<ErrorMessage> handleShyprException(ShyprException ex) {
        ErrorMessage errorMessage = new ErrorMessage(ex.getErrorCode(), ex.getErrorMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorMessage);
    }
}
