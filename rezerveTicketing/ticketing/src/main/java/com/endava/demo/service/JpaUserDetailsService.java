package com.endava.demo.service;

import com.endava.demo.model.SecurityUser;
import com.endava.demo.model.User;
import com.endava.demo.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@AllArgsConstructor
public class JpaUserDetailsService implements UserDetailsService {

    private final UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> u = userRepo.findUserByUsernameIgnoreCase(username);

        return u.map(SecurityUser::new).orElseThrow(
                () -> new UsernameNotFoundException("username not found for: " + username)
        );
    }
}
