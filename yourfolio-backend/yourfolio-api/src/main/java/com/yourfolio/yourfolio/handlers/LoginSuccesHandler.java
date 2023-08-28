package com.yourfolio.yourfolio.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yourfolio.yourfolio.dtos.AuthenticationDTO;
import com.yourfolio.yourfolio.loggers.RequestLogger;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

public class LoginSuccesHandler implements AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String jSessionId = request.getSession().getId();

        AuthenticationDTO authenticationResponse = AuthenticationDTO.builder().success(true).token(jSessionId).build();

        ObjectMapper objectMapper = new ObjectMapper();
        String myDtoJson = objectMapper.writeValueAsString(authenticationResponse);

//        RequestLogger.logRequest(request);

        response.getWriter().write(myDtoJson);
    }
}
