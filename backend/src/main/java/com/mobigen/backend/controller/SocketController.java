package com.mobigen.backend.controller;

import com.mobigen.backend.vo.SocketVO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/btn")
    public SocketVO greeting(SocketVO message) throws Exception {
        simpMessagingTemplate.convertAndSend("/sub", message);
        return message;
    }
}

