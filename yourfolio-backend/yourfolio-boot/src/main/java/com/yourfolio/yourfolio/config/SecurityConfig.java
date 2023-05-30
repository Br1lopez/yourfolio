package com.yourfolio.yourfolio.config;

import com.yourfolio.yourfolio.filters.DeactivateCorsFilter;
import com.yourfolio.yourfolio.handlers.LoginFailureHandler;
import com.yourfolio.yourfolio.handlers.LoginSuccesHandler;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
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
    // Configuración global de CORS:
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "https://localhost:3000"
             ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setExposedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    // Configuración global de seguridad:
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
       // Utilizar la configuración de CORS global:
                .cors(withDefaults())
                .csrf().disable()
                .authorizeHttpRequests()

        // Permitir que cualquier visitante se registre:
                    .requestMatchers(HttpMethod.POST, "/user/register").permitAll()

        // Permitir que solo los usuarios autenticados accedan a operaciones que modifiquen la BBDD:
                    .requestMatchers(HttpMethod.POST).authenticated()
                    .requestMatchers(HttpMethod.PUT).authenticated()
                    .requestMatchers(HttpMethod.PATCH).authenticated()
                    .requestMatchers(HttpMethod.DELETE).authenticated()

        // Permitir que cualquier visitante pueda ver el contenido público:
                    .requestMatchers(HttpMethod.GET).permitAll()
                    .anyRequest().permitAll()
                .and()
                .exceptionHandling()
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                    .and()

        // Creación del endpoint /login para iniciar sesión:
                .formLogin()
                    .usernameParameter("email")

        /*
        Uso de las clases personalizadas LoginSuccesHandler() y LoginFailureHandler()
        para gestionar la autenticación:
        */
                    .successHandler(new LoginSuccesHandler())
                    .failureHandler(new LoginFailureHandler());
        return http.build();
    }
}
