package com.endava.demo.service;

import com.endava.demo.repository.CartRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class CartService {

    private final CartRepo cartRepo;
}
