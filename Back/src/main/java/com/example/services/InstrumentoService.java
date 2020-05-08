package com.example.services;

import com.example.dto.InstrumentoDTO;
import com.example.entidades.Instrumentos;
import com.example.repository.InstrumentoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class InstrumentoService extends BaseService<Instrumentos, InstrumentoDTO>{
    private InstrumentoRepository instrumentoRepository;

    public InstrumentoService(InstrumentoRepository instrumentoRepository){
        super(instrumentoRepository, InstrumentoDTO.class, Instrumentos.class);
        this.instrumentoRepository = instrumentoRepository;
    }

    public void saveImg(MultipartFile imageFile) throws Exception {
        String folder = "/imagenes/";
        try {
            byte[] bytes = imageFile.getBytes();
            Path path = Paths.get(folder + imageFile.getOriginalFilename());
            Files.write(path, bytes);
        } catch (Exception e) {
            throw new Exception();
        }
    }

    public void deleteImage(String path) throws Exception {
        try {
            Files.deleteIfExists(Paths.get(path));
        } catch (Exception e) {
            throw new Exception();
        }
    }
}
