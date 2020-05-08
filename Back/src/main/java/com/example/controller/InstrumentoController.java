package com.example.controller;

import com.example.dto.InstrumentoDTO;
import com.example.services.InstrumentoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public String uploadImg(@RequestParam("imageFile") MultipartFile imageFile) {
        String value = "";
        try {
            instrumentoService.saveImg(imageFile);
            value = "..\\..\\..\\imagenes\\" + imageFile.getOriginalFilename();
            return value;
        } catch (Exception e) {
            return "Error";
        }
    }
    @DeleteMapping("/deleteImg")
    public ResponseEntity deleteImg(@PathVariable String path) {
        try {
            instrumentoService.deleteImage(path);
            return ResponseEntity.status(HttpStatus.OK).body("{\"Mensaje\": \"Imagen borrada\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"Mensaje\": \"Error al borrar esta imagen.\"}");
        }
    }
}
