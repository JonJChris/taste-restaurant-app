package com.restaurant.app.exceptionhandler;

import com.restaurant.app.exceptions.ApplicationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class ApplicationExceptionHandler {

    @ExceptionHandler(ApplicationException.class)
    public ResponseEntity<ApplicationError> handleErrorMessage(ApplicationException ae){
        String errorMessage = ae.getMessage();
        Throwable root , inner;
        root = ae;
        List<String> messages = new ArrayList<>();

        while((inner = root.getCause()) != null){
            messages.add(inner.getMessage());
            root = inner;
        }
        return new ResponseEntity<>(
               new ApplicationError(
                       errorMessage,
                       messages,
                       LocalDateTime.now()),
                HttpStatus.BAD_REQUEST
        );
    }
}
