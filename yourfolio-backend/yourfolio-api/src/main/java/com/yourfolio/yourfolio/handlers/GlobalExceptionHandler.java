package com.yourfolio.yourfolio.handlers;

import com.yourfolio.yourfolio.exceptions.ElementNotOwnedException;
import com.yourfolio.yourfolio.exceptions.LoginNeededException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.handler.ResponseStatusExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ElementNotOwnedException.class)
    public ResponseEntity<String> handleElementNotOwnedException(ElementNotOwnedException ex) {
        return new ResponseEntity<>(
                "Estás intentando acceder a un elemento que no ha sido creado por ti.",
                HttpStatus.FORBIDDEN);
    }


    @ExceptionHandler(LoginNeededException.class)
    public ResponseEntity<String> handleLoginNeededException(LoginNeededException ex) {
        return new ResponseEntity<>(
                "Login necesario.",
                HttpStatus.FORBIDDEN);
    }

}

