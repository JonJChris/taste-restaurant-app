package com.restaurant.ley.app.exceptionhandler;

import java.time.LocalDateTime;
import java.util.List;

public record ApplicationError(
        String errorMessage,
        List<String> errors,
        LocalDateTime errorTimeStamp
){}