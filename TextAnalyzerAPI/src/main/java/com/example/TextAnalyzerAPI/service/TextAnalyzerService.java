package com.example.TextAnalyzerAPI.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class TextAnalyzerService {

    public Map<String, Integer> analyzeText(String text) {
        Map<String, Integer> result = new HashMap<>();

        // Contagem de palavras
        String[] words = text.trim().split("\\s+");
        int wordCount = words.length;

        // Contagem de sentenças (considerando pontuações comuns)
        String[] sentences = text.split("[.!?]+");
        int sentenceCount = sentences.length;

        // Contagem de caracteres (excluindo espaços)
        int characterCount = text.replace(" ", "").length();

        // Adiciona os resultados ao mapa
        result.put("wordCount", wordCount);
        result.put("sentenceCount", sentenceCount);
        result.put("characterCount", characterCount);

        return result;
    }
}
