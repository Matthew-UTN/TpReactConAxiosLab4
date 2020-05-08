package com.example.controller;

import com.example.dto.InstrumentoDTO;
import com.example.services.InstrumentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import javax.transaction.Transactional;

@Controller
@RestController
@RequestMapping(path="api/v1/instrumentos")
public class InstrumentoController extends BaseController<InstrumentoDTO>{
    private InstrumentoService instrumentoService;

    public InstrumentoController(InstrumentoService instrumentoService) {
        super(instrumentoService);
        this.instrumentoService = instrumentoService;
    }

    @PostMapping("/uploadImg")
    @CrossOrigin(origins = "*")
    @Transactional
    public ResponseEntity uploadImg(@RequestParam("imagen") MultipartFile[] imageFile) {
        try {

            return ResponseEntity.status(HttpStatus.OK).body(instrumentoService.saveImg(imageFile));

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"message\": \"Error. Please try again later.\"}");

        }


    }
}
