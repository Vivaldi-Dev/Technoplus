package com.example.TextAnalyzerAPI.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.TextAnalyzerAPI.service.TextAnalyzerService;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class TextAnalyzerController {

    @Autowired
    private TextAnalyzerService textAnalyzerService;

    @PostMapping("/analyze")
    public ResponseEntity<Map<String, Integer>> analyzeText(@RequestBody Map<String, String> requestBody) {
        String text = requestBody.get("text");
        Map<String, Integer> analysis = textAnalyzerService.analyzeText(text);
        return ResponseEntity.ok(analysis);
    }
}
