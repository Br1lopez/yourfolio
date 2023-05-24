package com.yourfolio.yourfolio.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yourfolio.yourfolio.dtos.AuthenticationDTO;
import com.yourfolio.yourfolio.loggers.RequestLogger;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

public class LoginFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        AuthenticationDTO authenticationResponse =AuthenticationDTO.builder().success(false).token("").build();

        ObjectMapper objectMapper = new ObjectMapper();
        String myDtoJson = objectMapper.writeValueAsString(authenticationResponse);
        System.out.println(request);

        RequestLogger.logRequest(request);

        response.getWriter().write(myDtoJson);
    }
}
