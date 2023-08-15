package com.restaurant.app.exceptions;

import org.springframework.http.HttpStatus;

public class ApplicationException extends RuntimeException {
    public ApplicationException(String errorMessage){
        super(errorMessage);
    }
    public ApplicationException(String errorMessage, Throwable err){
        super(errorMessage, err);
    }

}
