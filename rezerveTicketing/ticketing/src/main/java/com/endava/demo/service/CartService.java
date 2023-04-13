package com.endava.demo.service;

import com.endava.demo.exception.UserDoesNotExistsException;
import com.endava.demo.model.Cart;
import com.endava.demo.model.User;
import com.endava.demo.repository.CartRepo;
import com.endava.demo.repository.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class CartService {

    private final CartRepo cartRepo;


}
