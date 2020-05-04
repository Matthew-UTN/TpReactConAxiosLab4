package com.example.controller;

import com.example.dto.InstrumentoDTO;
import com.example.services.InstrumentoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequestMapping(path="api/v1/instrumentos")
public class InstrumentoController extends BaseController<InstrumentoDTO>{
    private InstrumentoService instrumentoService;

    public InstrumentoController(InstrumentoService instrumentoService) {
        super(instrumentoService);
        this.instrumentoService = instrumentoService;
    }
}
