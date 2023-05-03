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
        String htmlTemplate = generateHtmlTemplate(emailRequest.getCartContents(), emailRequest.getTicket());
        emailService.sendEmail(userEmail, subject, htmlTemplate);
    }

    private String generateHtmlTemplate(String cartContents, String ticket) {
        String htmlTemplate = "<h1>Cart Contents:</h1><pre>" + cartContents + "</pre><br><h1>Ticket:</h1><pre>" + ticket + "</pre>";
        return htmlTemplate;
    }
}
