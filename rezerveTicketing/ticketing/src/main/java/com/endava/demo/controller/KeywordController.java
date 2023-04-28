package com.endava.demo.controller;

import com.endava.demo.dto.KeywordDto;
import com.endava.demo.exception.KeywordAlreadyExistsException;
import com.endava.demo.model.Keyword;
import com.endava.demo.service.KeywordService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constant.KEYWORD_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class KeywordController {

    private final KeywordService keywordService;

    @PostMapping(Constant.NEW)
    public ResponseEntity<?> addKeyword(@RequestBody KeywordDto keywordDto){

        try {
            keywordService.addKeyword(keywordDto.getName());

            return ResponseEntity.ok().build();
        }
        catch (KeywordAlreadyExistsException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
