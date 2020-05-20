package com.example.controller;

import com.example.dto.InstrumentoDTO;
import com.example.services.InstrumentoService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RestController
@RequestMapping(path="api/v1/instrumentos")
public class InstrumentoController extends BaseController<InstrumentoDTO>{

    @Autowired
    private ServletContext servletContext;

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
    @RequestMapping(value = "/getImage/{imageId}", method = RequestMethod.GET)
    public void getImageAsByteArray(@PathVariable String imageId, HttpServletResponse response ) throws IOException {
        InputStream in = servletContext.getResourceAsStream("/WEB-INF/imagenes/"+imageId);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        IOUtils.copy(in, response.getOutputStream());
    }

}
