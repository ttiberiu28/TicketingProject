package com.endava.demo.controller;

import com.endava.demo.dto.EmailRequest;
import com.endava.demo.service.EmailService;
import constant.Constant;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constant.EMAIL_CONTROLLER)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/send")
    public void sendEmail(@RequestBody EmailRequest emailRequest) {
        String userEmail = emailRequest.getUserEmail();
        String subject = "Your Cart and Ticket Information";
        String htmlTemplate = emailRequest.getHtmlTemplate(); // Use the HTML template sent in the request
        emailService.sendEmail(userEmail, subject, htmlTemplate);
    }


}
