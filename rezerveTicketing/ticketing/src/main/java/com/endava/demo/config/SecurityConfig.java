package com.endava.demo.config;

import constant.Constant;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @CrossOrigin(origins = "http://localhost:3002")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors().configurationSource(request -> {
                    var cors = new CorsConfiguration();
                    cors.setAllowedOrigins(List.of("http://localhost:3002"));
                    cors.setAllowedMethods(List.of("GET","POST","PUT","DELETE"));
                    return cors.applyPermitDefaultValues();
                })
                .and()
                .httpBasic()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .mvcMatchers(Constant.USER_CONTROLLER + Constant.NEW).permitAll()
                .mvcMatchers(Constant.MOVIE_CONTROLLER + Constant.LIST).authenticated()
                .mvcMatchers(Constant.LOCATION_CONTROLLER + Constant.LIST).authenticated()
                .mvcMatchers(Constant.STAND_UP_CONTROLLER + Constant.LIST).authenticated()
                .mvcMatchers(Constant.SPECIAL_GUEST_CONTROLLER + Constant.LIST).authenticated()
                .mvcMatchers(Constant.TICKET_CONTROLLER + Constant.LIST).authenticated()
                .mvcMatchers(Constant.MOVIE_CONTROLLER + Constant.ASSIGN_TICKET).hasAnyAuthority(Constant.USER_ROLE, Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.STAND_UP_CONTROLLER + Constant.ASSIGN_TICKET).hasAnyAuthority(Constant.USER_ROLE, Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.USER_CONTROLLER + Constant.LIST).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.MOVIE_CONTROLLER + Constant.NEW).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.LOCATION_CONTROLLER + Constant.NEW).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.ROLE_CONTROLLER + Constant.NEW).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.SPECIAL_GUEST_CONTROLLER + Constant.NEW).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.STAND_UP_CONTROLLER + Constant.NEW).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.TICKET_CONTROLLER + Constant.NEW).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.MOVIE_CONTROLLER + Constant.ASSIGN_LOCATION).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.STAND_UP_CONTROLLER + Constant.ASSIGN_LOCATION).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(Constant.STAND_UP_CONTROLLER + Constant.ASSIGN_SPECIAL_GUEST).hasAuthority(Constant.ADMIN_ROLE)
//                .mvcMatchers(Constant.USER_CONTROLLER + Constant.ASSIGN_ROLE).hasAuthority(Constant.ADMIN_ROLE)
//                .mvcMatchers(Constant.ROLE_CONTROLLER).hasAuthority(Constant.ADMIN_ROLE)
                .mvcMatchers(HttpMethod.DELETE, Constant.ALL_API).hasAuthority(Constant.ADMIN_ROLE)
                .and()
                .csrf().disable().build();
    }
}
