package com.example.services;

import com.example.dto.InstrumentoDTO;
import com.example.entidades.Instrumentos;
import com.example.repository.InstrumentoRepository;
import org.springframework.stereotype.Service;

@Service
public class InstrumentoService extends BaseService<Instrumentos, InstrumentoDTO>{
    private InstrumentoRepository instrumentoRepository;

    public InstrumentoService(InstrumentoRepository instrumentoRepository){
        super(instrumentoRepository, InstrumentoDTO.class, Instrumentos.class);
        this.instrumentoRepository=instrumentoRepository;
    }
}
