package com.example.services;

import com.example.dto.InstrumentoDTO;
import com.example.entidades.Instrumentos;
import com.example.repository.InstrumentoRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import sun.misc.IOUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class InstrumentoService extends BaseService<Instrumentos, InstrumentoDTO>{
    private InstrumentoRepository instrumentoRepository;
    public static String uploadDirectory = System.getProperty("user.dir")+"/src/main/webapp/WEB-INF/imagenes";

    public InstrumentoService(InstrumentoRepository instrumentoRepository){
        super(instrumentoRepository, InstrumentoDTO.class, Instrumentos.class);
        this.instrumentoRepository = instrumentoRepository;
    }

    public StringBuilder saveImg(MultipartFile[] imageFile) throws Exception {
        StringBuilder fileNames = new StringBuilder();
        for (MultipartFile file : imageFile) {
            Path fileNameAndPath = Paths.get(uploadDirectory, file.getOriginalFilename());
            fileNames.append(file.getOriginalFilename()+" ");
            try {
                Files.write(fileNameAndPath, file.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return fileNames;
    }


}
