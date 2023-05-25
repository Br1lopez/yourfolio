package com.yourfolio.yourfolio.config;

import com.yourfolio.yourfolio.filters.DeactivateCorsFilter;
import com.yourfolio.yourfolio.handlers.LoginFailureHandler;
import com.yourfolio.yourfolio.handlers.LoginSuccesHandler;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.SessionManagementFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {



    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "https://localhost:3000",
                "http://localhost:8088",
                "http://localhost:8088/*",
                "http://localhost:8088/login",
                "https://localhost:8088"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        //source.registerCorsConfiguration("/user/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(withDefaults())
                .csrf().disable()
                .authorizeHttpRequests()
                    .requestMatchers(HttpMethod.POST, "/user/register").permitAll()
                    .requestMatchers(HttpMethod.POST).authenticated()
                    .anyRequest().permitAll()
                    .and()
                .formLogin()
                    .usernameParameter("email")
                    .successHandler(new LoginSuccesHandler())
                    .failureHandler(new LoginFailureHandler());
        return http.build();
    }
}
