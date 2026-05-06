package com.example.g8_fitness;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/")
    public String home() {
        return "G8 Fitness Backend is Running 🚀";
    }
}
