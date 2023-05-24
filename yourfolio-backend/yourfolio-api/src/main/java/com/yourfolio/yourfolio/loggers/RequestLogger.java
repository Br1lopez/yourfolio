package com.yourfolio.yourfolio.loggers;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Enumeration;


public class RequestLogger {
    public static void logRequest(HttpServletRequest request) {
        System.out.println("Method: " + request.getMethod());
        System.out.println("Request URI: " + request.getRequestURI());
        System.out.println("Protocol: " + request.getProtocol());
        System.out.println("Remote Address: " + request.getRemoteAddr());

        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            System.out.println(headerName + ": " + request.getHeader(headerName));
        }

        Enumeration<String> parameterNames = request.getParameterNames();
        while (parameterNames.hasMoreElements()) {
            String parameterName = parameterNames.nextElement();
            System.out.println(parameterName + ": " + request.getParameter(parameterName));
        }


        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println(cookie.getName() + ": " + cookie.getValue());
            }
        }

        System.out.println("Auth Type: " + request.getAuthType());
        System.out.println("Context Path: " + request.getContextPath());
        System.out.println("Path Info: " + request.getPathInfo());
        System.out.println("Query String: " + request.getQueryString());
        System.out.println("Remote User: " + request.getRemoteUser());
        System.out.println("Requested Session Id: " + request.getRequestedSessionId());
        System.out.println("Request URL: " + request.getRequestURL());
        System.out.println("Servlet Path: " + request.getServletPath());
    }
}
