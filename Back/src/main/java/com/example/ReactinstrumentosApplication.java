package com.example;

import com.example.controller.InstrumentoController;
import com.example.services.InstrumentoService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.io.File;

@SpringBootApplication
public class ReactinstrumentosApplication {

    public static void main(String[] args) {
        new File(InstrumentoService.uploadDirectory).mkdir();
        SpringApplication.run(ReactinstrumentosApplication.class, args);
    }

}
