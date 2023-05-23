package com.yourfolio.yourfolio.config;

import com.yourfolio.yourfolio.handlers.LoginFailureHandler;
import com.yourfolio.yourfolio.handlers.LoginSuccesHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable()
                .authorizeHttpRequests()
                    .requestMatchers(HttpMethod.POST, "/users/register").permitAll()
                    .requestMatchers(HttpMethod.POST).authenticated()
                    .anyRequest().permitAll()
                    .and()
                .formLogin()
                    .successHandler(new LoginSuccesHandler())
                    .failureHandler(new LoginFailureHandler());
        return http.build();
    }
}
