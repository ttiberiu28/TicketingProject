package com.endava.demo.service;

import com.endava.demo.exception.KeywordAlreadyExistsException;
import com.endava.demo.model.Keyword;
import com.endava.demo.repository.KeywordRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@AllArgsConstructor
public class KeywordService {

    private final KeywordRepo keywordRepo;

    public void addKeyword(String name){

        var k = keywordRepo.findByNameIgnoreCase(name);

        k.ifPresentOrElse(x -> {

            throw new KeywordAlreadyExistsException(x.getName());
        }, () -> {

            Keyword x = new Keyword();

            x.setName(name);

            keywordRepo.save(x);
        });
    }
}
